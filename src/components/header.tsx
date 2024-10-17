import { View, Text } from "react-native";
import Constants from "expo-constants";

type HeaderProps = {
	title: string;
	subtitle: string;
};

export function Header({ title, subtitle }: HeaderProps) {
	return (
		<View
			style={{ paddingTop: 16 + Constants.statusBarHeight }}
			className="flex flex-col px-6 pb-5 border-b border-b-gray-500"
		>
			<Text className="text-4xl text-white font-open-sans-bold">{title}</Text>
			<Text className="text-md text-white font-open-sans-regular">
				{subtitle}
			</Text>
		</View>
	);
}
