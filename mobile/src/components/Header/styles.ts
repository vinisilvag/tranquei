import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { SvgUri } from 'react-native-svg';

export const Container = styled.View`
  width: 100%;
  padding: 0 24px;
  padding-bottom: 10px;
  padding-top: 34px;
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
  align-items: center;
`;

export const Avatar = styled(SvgUri)`
  border-radius: 17px;
`;

export const Column = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.inter_600};
  color: ${props => props.theme.colors.title};
  font-size: 14px;
  margin-top: 0px;
`;

export const Subtitle = styled.Text`
  font-family: ${props => props.theme.fonts.inter_400};
  color: ${props => props.theme.colors.text};
  font-size: 12px;
`;

export const IconButton = styled(BorderlessButton)``;
