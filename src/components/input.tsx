import { TextInput } from "react-native";
import type { TextInputProps } from "react-native";

import { Controller } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

import { colors } from "@/styles/colors";

type InputProps = TextInputProps & {
	inputName: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	control: FieldValues | any;
	isSending?: boolean;
};

export function Input({ inputName, control, isSending, ...props }: InputProps) {
	return (
		<Controller
			control={control}
			name={inputName}
			render={({
				field: { onChange, onBlur, value },
				fieldState: { error },
			}) => {
				return (
					<TextInput
						placeholderTextColor={colors.gray[400]}
						className="flex-1 h-14 px-4 bg-gray-800 border border-gray-500 rounded-xl text-white font-open-sans-regular"
						cursorColor={colors.secondary}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						editable={!isSending}
						{...props}
					/>
				);
			}}
		/>
	);
}
