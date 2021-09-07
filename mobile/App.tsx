import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from 'styled-components';

import { useFonts } from 'expo-font';
import { Archivo_600SemiBold } from '@expo-google-fonts/archivo';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

import AppLoading from 'expo-app-loading';
import { AppProvider } from './src/contexts';

import { theme } from './src/globals/styles/theme';

import { Routes } from './src/routes';

export default function App() {
  const { colors } = theme;

  const [fontsLoaded] = useFonts({
    Archivo_600SemiBold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor={colors.background} style="dark" />
        <AppProvider>
          <Routes />
        </AppProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
