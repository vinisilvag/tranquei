import "@/styles/globals.css";
import "@/libs/dayjs";

import { View, Text } from "react-native";

import { loadAsync } from "expo-font";
import {
	OpenSans_300Light,
	OpenSans_400Regular,
	OpenSans_500Medium,
	OpenSans_600SemiBold,
	OpenSans_700Bold,
	useFonts,
} from "@expo-google-fonts/open-sans";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/query-client";

import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite/next";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../../drizzle/migrations";

import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";

import { useEffect } from "react";

import { colors } from "@/styles/colors";

SystemUI.setBackgroundColorAsync("#0E0F11");
SplashScreen.preventAutoHideAsync();

const DATABASE_NAME = "database.db";
const expoDb = openDatabaseSync(DATABASE_NAME);
const db = drizzle(expoDb);

export default function Layout() {
	const { success: migrationsSuccess, error: migrationsError } = useMigrations(
		db,
		migrations,
	);

	const [loaded, fontError] = useFonts({
		OpenSans_300Light,
		OpenSans_400Regular,
		OpenSans_500Medium,
		OpenSans_600SemiBold,
		OpenSans_700Bold,
	});

	useEffect(() => {
		if ((loaded || fontError) && (migrationsError || migrationsSuccess)) {
			SplashScreen.hideAsync();
		}
	}, [loaded, fontError, migrationsError, migrationsSuccess]);

	if (loaded && fontError) {
		return (
			<View className="flex-1 px-6 items-center justify-center flex-col gap-4">
				<Text className="font-open-sans-bold text-xl text-white">
					Error when loading Google Fonts!
				</Text>
				<Text className="font-open-sans-regular text-gray-400">
					{fontError?.message}
				</Text>
			</View>
		);
	}

	if (!migrationsSuccess && migrationsError) {
		return (
			<View className="flex-1 px-6 items-center justify-center flex-col gap-4">
				<Text className="font-open-sans-bold text-xl text-white">
					Error when loading DB migrations!
				</Text>
				<Text className="font-open-sans-regular text-gray-400">
					{migrationsError?.message}
				</Text>
			</View>
		);
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<StatusBar style="light" />
			<QueryClientProvider client={queryClient}>
				<SQLiteProvider databaseName={DATABASE_NAME}>
					<Stack
						screenOptions={{
							headerShown: false,
							contentStyle: {
								backgroundColor: colors.gray[700],
							},
						}}
					/>
				</SQLiteProvider>
			</QueryClientProvider>
		</GestureHandlerRootView>
	);
}
