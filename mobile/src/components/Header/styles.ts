import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 0 24px;
  padding-bottom: 10px;
  padding-top: 30px;
  background-color: ${props => props.theme.colors.background};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 0.5px;
  border-bottom-color: ${props => props.theme.colors.inputBg};
`;

export const ProfileButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.6,
}))`
  flex-direction: row;
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const Column = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.inter_600};
  color: ${props => props.theme.colors.title};
  font-size: 16px;
  margin-top: 0px;
`;

export const Subtitle = styled.Text`
  font-family: ${props => props.theme.fonts.inter_400};
  color: ${props => props.theme.colors.text};
  font-size: 13px;
`;

export const IconButton = styled(BorderlessButton)``;
