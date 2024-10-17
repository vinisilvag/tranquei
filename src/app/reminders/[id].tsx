import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import Constants from "expo-constants";

import { ArrowLeft } from "lucide-react-native";

import { useQuery } from "@tanstack/react-query";

import { useSQLiteContext } from "expo-sqlite";
import * as reminderSchema from "@/database/schemas/reminder-schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { colors } from "@/styles/colors";

import { router } from "expo-router";

export default function ReminderLocation() {
	const database = useSQLiteContext();
	const db = drizzle(database, { schema: reminderSchema });

	const { id } = useLocalSearchParams<{ id: string }>();

	const { data } = useQuery({
		queryKey: ["reminders", id],
		queryFn: async () => {
			return await db.query.reminder.findFirst({
				where: (reminders, { eq }) => eq(reminders.id, Number(id)),
			});
		},
	});

	return (
		<View className="flex-1">
			<View
				style={{ paddingTop: 10 + Constants.statusBarHeight }}
				className="flex px-6 pb-5 border-b border-b-gray-500"
			>
				<TouchableOpacity
					className="w-10 h-10 flex justify-center self-start"
					onPress={() => {
						router.back();
					}}
					activeOpacity={0.5}
				>
					<ArrowLeft size={24} color="#fff" />
				</TouchableOpacity>
				<Text className="text-4xl text-white font-open-sans-bold mt-4">
					Local no mapa
				</Text>
				<Text className="text-md text-white font-open-sans-regular">
					Onde essa entrada foi registrada.
				</Text>
			</View>

			{!data ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size="small" color={colors.primary} />
				</View>
			) : (
				<MapView
					style={{ flex: 1 }}
					initialRegion={{
						latitude: data.latitude,
						longitude: data.longitude,
						latitudeDelta: 0.007,
						longitudeDelta: 0.007,
					}}
				>
					<Marker
						coordinate={{ latitude: data.latitude, longitude: data.longitude }}
					/>
				</MapView>
			)}
		</View>
	);
}
