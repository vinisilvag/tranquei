import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 24px;
  padding-bottom: 8px;
  padding-top: 36px;
  background-color: ${props => props.theme.colors.background};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ProfileButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.6,
}))`
  flex-direction: row;
`;

export const Avatar = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 21px;
`;

export const Column = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.poppins_600};
  color: ${props => props.theme.colors.title};
  font-size: 17px;
  margin-top: -5px;
`;

export const Subtitle = styled.Text`
  font-family: ${props => props.theme.fonts.poppins_400};
  color: ${props => props.theme.colors.text};
  font-size: 14px;
`;

export const IconButton = styled(BorderlessButton)``;
