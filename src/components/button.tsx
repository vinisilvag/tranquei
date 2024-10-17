import { PlusIcon } from "lucide-react-native";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import type { TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
	isLoading?: boolean;
};

export function Button({ isLoading, ...props }: ButtonProps) {
	return (
		<TouchableOpacity
			className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center"
			activeOpacity={0.5}
			disabled={isLoading}
			{...props}
		>
			<Text className="font-open-sans-semibold text-lg text-white uppercase">
				{isLoading ? (
					<ActivityIndicator size="small" color="#000" />
				) : (
					<PlusIcon size={24} color="#000" />
				)}
			</Text>
		</TouchableOpacity>
	);
}
