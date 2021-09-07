import styled from 'styled-components/native';
import Constants from 'expo-constants';

export const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingVertical: 24,
  },
  showsVerticalScrollIndicator: false,
}))`
  flex: 1;
  padding: 0 24px;
  background-color: ${props => props.theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  padding: 0 24px;
  padding-bottom: 16px;
  padding-top: 38px;
  background-color: ${props => props.theme.colors.background};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 0.5px;
  border-bottom-color: ${props => props.theme.colors.inputBg};
`;

export const Avatar = styled.Image`
  width: 128px;
  height: 128px;
  border-radius: 64px;
  align-self: center;
  margin-bottom: 32px;
`;
