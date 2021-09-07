import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const ButtonContainer = styled(RectButton)`
  width: 100%;
  height: 48px;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 8px;

  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-family: ${props => props.theme.fonts.inter_600};
  color: ${props => props.theme.colors.white};
  font-size: 16px;
`;
