import React from 'react';
import { ActivityIndicator } from 'react-native';

import { RectButtonProperties } from 'react-native-gesture-handler';
import { ButtonContainer, ButtonText } from './styles';

import { theme } from '../../globals/styles/theme';

type ButtonProps = RectButtonProperties & {
  isLoading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  children,
  ...rest
}) => {
  const { colors } = theme;

  return (
    <ButtonContainer enabled={!isLoading} {...rest}>
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.background} />
      ) : (
        <ButtonText>{children}</ButtonText>
      )}
    </ButtonContainer>
  );
};
