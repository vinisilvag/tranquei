import { View, Text, FlatList, ActivityIndicator } from "react-native";

import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { ReminderItem } from "@/components/reminder-item";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import * as reminderSchema from "@/database/schemas/reminder-schema";
import { drizzle } from "drizzle-orm/expo-sqlite";

import { colors } from "@/styles/colors";
import { queryClient } from "@/libs/query-client";

import * as Location from "expo-location";

import type { Reminder } from "@/types/reminder";

import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type CreateReminderData = {
	message?: string;
};

const createReminderSchema = z.object({
	message: z.string(),
});

export default function Home() {
	const database = useSQLiteContext();
	const db = drizzle(database, { schema: reminderSchema });

	const { data: reminders, isLoading: isLoadingReminders } = useQuery<
		Reminder[]
	>({
		queryKey: ["reminders"],
		queryFn: async () => {
			return await db.query.reminder.findMany({
				orderBy: (reminders, { desc }) => [desc(reminders.timestamp)],
			});
		},
	});

	const mutation = useMutation({
		mutationFn: async ({ message }: { message: string }) => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				return;
			}
			const location = await Location.getCurrentPositionAsync({});
			const { latitude, longitude } = location.coords;
			await db.insert(reminderSchema.reminder).values({
				message,
				timestamp: new Date(),
				latitude,
				longitude,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["reminders"] });
		},
	});

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isLoading: isLoadingCreateReminder },
	} = useForm<CreateReminderData>({
		resolver: zodResolver(createReminderSchema),
		defaultValues: {
			message: "",
		},
	});

	const handleCreateReminder: SubmitHandler<CreateReminderData> = async (
		data,
	) => {
		mutation.mutate({ message: data.message ?? "" });
		reset();
	};

	return (
		<>
			<View className="flex-1">
				<Header
					title="Seu histórico"
					subtitle="Todos as entradas realizadas até o momento."
				/>

				{isLoadingReminders ? (
					<View className="flex-1 py-5">
						<ActivityIndicator size="small" color={colors.primary} />
					</View>
				) : (
					<FlatList
						data={reminders}
						keyExtractor={(item) => String(item.id)}
						contentContainerStyle={{
							paddingVertical: 20,
						}}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => <ReminderItem {...item} />}
						ItemSeparatorComponent={() => <View className="w-full h-3" />}
						ListEmptyComponent={() => (
							<View className="flex items-center justify-center">
								<Text className="font-open-sans-medium text-gray-400 text-lg">
									Nada para ver aqui ainda :(
								</Text>
							</View>
						)}
					/>
				)}

				<View className="bg-gray-900 border-t border-gray-500 p-6 flex flex-row gap-4">
					<Input
						control={control}
						inputName="message"
						placeholder="Mensagem"
						isSending={isLoadingCreateReminder}
					/>
					<Button
						isLoading={isLoadingCreateReminder}
						onPress={handleSubmit(handleCreateReminder)}
					/>
				</View>
			</View>
		</>
	);
}
