import {
	OpenSans_300Light,
	OpenSans_400Regular,
	OpenSans_500Medium,
	OpenSans_600SemiBold,
	OpenSans_700Bold,
	useFonts,
} from "@expo-google-fonts/open-sans";
import * as SplashScreen from "expo-splash-screen";

import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import { useEffect } from "react";

import { colors } from "@/styles/colors";

import "@/styles/globals.css";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
	const [loaded, error] = useFonts({
		OpenSans_300Light,
		OpenSans_400Regular,
		OpenSans_500Medium,
		OpenSans_600SemiBold,
		OpenSans_700Bold,
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<>
			<StatusBar style="light" />
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: {
						backgroundColor: colors.gray[700],
						paddingHorizontal: 24,
						paddingTop: 32 + Constants.statusBarHeight,
						paddingBottom: 32,
					},
				}}
			/>
		</>
	);
}
