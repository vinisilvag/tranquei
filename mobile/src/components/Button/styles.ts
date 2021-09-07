import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const ButtonContainer = styled(RectButton)`
  width: 100%;
  height: 56px;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 8px;

  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-family: ${props => props.theme.fonts.archivo_600};
  color: ${props => props.theme.colors.white};
  font-size: 16px;
`;
