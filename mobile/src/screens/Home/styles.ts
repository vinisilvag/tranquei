import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  background-color: ${props => props.theme.colors.background};
`;

export const Footer = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 0 12px;
  padding-top: 12px;
  background-color: ${props => props.theme.colors.background};
`;

export const SquareButton = styled(RectButton)`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.primary};

  align-items: center;
  justify-content: center;

  margin-left: 12px;
`;
