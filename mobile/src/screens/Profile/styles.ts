import styled from 'styled-components/native';
import { SvgUri } from 'react-native-svg';

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

export const Avatar = styled(SvgUri)`
  align-self: center;
  margin-bottom: 32px;
`;
