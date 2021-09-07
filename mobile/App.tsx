import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from 'styled-components';

import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import AppLoading from 'expo-app-loading';
import { View } from 'react-native';
import { AppProvider } from './src/contexts';

import { theme } from './src/globals/styles/theme';

import { Routes } from './src/routes';

export default function App() {
  const { colors } = theme;

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor={colors.background} style="light" />
        <AppProvider>
          <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Routes />
          </View>
        </AppProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
