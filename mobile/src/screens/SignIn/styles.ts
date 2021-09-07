import styled from 'styled-components/native';
import Constants from 'expo-constants';

export const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingVertical: 24,
    paddingTop: 48 + Constants.statusBarHeight,
  },
  showsVerticalScrollIndicator: false,
}))`
  flex: 1;
  width: 100%;
  padding: 0 24px;
  background-color: ${props => props.theme.colors.background};
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.archivo_600};
  font-size: 28px;
  color: ${props => props.theme.colors.title};
  margin-bottom: 40px;
`;

export const SignUpButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.6,
}))`
  align-self: center;
  margin-top: 8px;
`;

export const SignUpText = styled.Text`
  font-family: ${props => props.theme.fonts.poppins_400};
  font-size: 14px;
  color: ${props => props.theme.colors.text};
`;

export const SignUpTextDetail = styled.Text`
  font-family: ${props => props.theme.fonts.poppins_500};
  color: ${props => props.theme.colors.primary};
`;
