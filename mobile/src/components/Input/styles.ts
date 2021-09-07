import styled from 'styled-components/native';

export const Label = styled.Text`
  font-family: ${props => props.theme.fonts.poppins_400};
  font-size: 15px;
  color: ${props => props.theme.colors.text};
`;

export const Container = styled.View`
  flex: 1;
  height: 52px;
  background-color: ${props => props.theme.colors.inputBg};
  border-width: 1px;
  border-color: ${props => props.theme.colors.inputBorder};
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 0 12px;
  padding-top: 2px;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: ${props => props.theme.fonts.poppins_400};
  font-size: 15px;
  /* color: ${props => props.theme.colors.text}; */
`;

export const ErrorMessage = styled.Text`
  font-family: ${props => props.theme.fonts.poppins_500};
  font-size: 14px;
  color: ${props => props.theme.colors.red};
  margin-top: -6px;
  margin-bottom: 8px;
`;
