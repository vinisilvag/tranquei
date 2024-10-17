import type { TouchableOpacityProps } from "react-native";
import { TouchableOpacity } from "react-native";
import { Plus } from "lucide-react-native";

export function Fab({ ...props }: TouchableOpacityProps) {
	return (
		<TouchableOpacity
			className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center absolute bottom-4 right-4"
			activeOpacity={0.5}
			{...props}
		>
			<Plus color="black" size={24} />
		</TouchableOpacity>
	);
}
