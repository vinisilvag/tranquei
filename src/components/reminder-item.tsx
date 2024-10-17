import { View, Text, TouchableOpacity } from "react-native";
import { MapIcon, TrashIcon } from "lucide-react-native";

import { Swipeable } from "react-native-gesture-handler";
import type { Reminder } from "@/types/reminder";

import { useMutation } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import * as reminderSchema from "@/database/schemas/reminder-schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";

import { queryClient } from "@/libs/query-client";

import { router } from "expo-router";

import dayjs from "dayjs";

export function ReminderItem({ id, message, timestamp }: Reminder) {
	const database = useSQLiteContext();
	const db = drizzle(database, { schema: reminderSchema });

	const mutation = useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			await db
				.delete(reminderSchema.reminder)
				.where(eq(reminderSchema.reminder.id, id));
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["reminders"] });
		},
	});

	const RightSwipeActions = () => {
		return (
			<View className="flex flex-row items-center justify-center gap-3 pr-12">
				<TouchableOpacity
					className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center"
					activeOpacity={0.5}
					onPress={() => {
						router.push({
							pathname: `./reminders/${id}`,
						});
					}}
				>
					<MapIcon size={24} color="#fff" />
				</TouchableOpacity>
				<TouchableOpacity
					className="w-14 h-14 bg-danger rounded-xl flex items-center justify-center"
					activeOpacity={0.5}
					onPress={() => mutation.mutate({ id })}
				>
					<TrashIcon size={24} color="#fff" />
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<Swipeable renderRightActions={RightSwipeActions}>
			<View className="w-full px-6">
				<View className="w-full rounded-xl bg-gray-600 py-3 px-4 border border-gray-500 flex flex-row items-center justify-center gap-4">
					<View className="flex-1">
						{message ? (
							<Text className="font-open-sans-medium text-white">
								{message}
							</Text>
						) : (
							<Text className="font-open-sans-medium italic text-white">
								Entrada sem mensagem informada.
							</Text>
						)}
						<Text className="font-open-sans-regular text-gray-400 mt-2">
							{dayjs(timestamp).format(
								"dddd, D [de] MMMM [de] YYYY [às] h:mm A",
							)}
						</Text>
					</View>
				</View>
			</View>
		</Swipeable>
	);
}
