import styled from 'styled-components/native';

export const Label = styled.Text`
  font-family: ${props => props.theme.fonts.inter_400};
  font-size: 15px;
  color: ${props => props.theme.colors.text};
  margin-bottom: 4px;
`;

export const Container = styled.View`
  flex: 1;
  height: 48px;
  background-color: ${props => props.theme.colors.inputBg};
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 0 12px;
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: ${props => props.theme.fonts.inter_400};
  font-size: 15px;
  color: ${props => props.theme.colors.white};
`;

export const ErrorMessage = styled.Text`
  font-family: ${props => props.theme.fonts.inter_500};
  font-size: 14px;
  color: ${props => props.theme.colors.red};
  margin-top: -6px;
  margin-bottom: 8px;
`;
