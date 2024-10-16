import { View, Text } from "react-native";

export function Header() {
	return (
		<View className="flex flex-col">
			<Text className="text-4xl text-white font-open-sans-bold">
				Seu histórico
			</Text>
			<Text className="text-md text-white font-open-sans-regular">
				Todos as entradas realizadas até o momento.
			</Text>
		</View>
	);
}
