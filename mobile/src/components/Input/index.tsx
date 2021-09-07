import React, { useState, ForwardRefRenderFunction, forwardRef } from 'react';

import { TextInputProps, TextInput as DefaultInput } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';

import { FieldError } from 'react-hook-form';

import { Label, Container, TextInput, ErrorMessage } from './styles';

import { theme } from '../../globals/styles/theme';

type InputProps = TextInputProps & {
  label?: string;
  error?: FieldError;
  passwordInput?: boolean;
};

const InputBase: ForwardRefRenderFunction<DefaultInput, InputProps> = (
  { label, error, passwordInput, ...rest },
  ref,
) => {
  const [showPassword, setShowPassword] = useState(false);

  const { colors } = theme;

  return (
    <>
      {!!label && <Label>{label}</Label>}

      <Container>
        <TextInput
          selectionColor={colors.primary}
          {...rest}
          ref={ref}
          secureTextEntry={passwordInput ? !showPassword : false}
        />

        {passwordInput && (
          <BorderlessButton onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? 'eye-off' : 'eye'}
              color={colors.primary}
              size={24}
            />
          </BorderlessButton>
        )}
      </Container>

      {!!error && <ErrorMessage>{error.message}</ErrorMessage>}
    </>
  );
};

export const Input = forwardRef(InputBase);
