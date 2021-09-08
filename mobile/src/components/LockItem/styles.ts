import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  margin-top: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Left = styled.View`
  flex-direction: column;
  justify-content: center;
`;

export const Description = styled.Text`
  font-family: ${props => props.theme.fonts.inter_400};
  color: ${props => props.theme.colors.title};
`;

export const Time = styled.Text`
  font-family: ${props => props.theme.fonts.inter_500};
  color: ${props => props.theme.colors.text};
  font-size: 14px;
`;

export const DeleteButton = styled(RectButton)`
  width: 28px;
  height: 28px;
  background-color: ${props => props.theme.colors.red};
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;
