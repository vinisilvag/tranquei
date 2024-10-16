import { TouchableOpacity } from "react-native";
import { Plus } from "lucide-react-native";

export function Fab() {
	return (
		<TouchableOpacity
			className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center absolute bottom-6 right-6"
			activeOpacity={0.5}
		>
			<Plus color="black" size={24} />
		</TouchableOpacity>
	);
}
