import { View } from "react-native";

import { Header } from "@/components/header";
import { Fab } from "@/components/fab";

export default function Home() {
	return (
		<>
			<View className="w-full h-full flex flex-col gap-12">
				<Header />
			</View>

			<Fab />
		</>
	);
}
