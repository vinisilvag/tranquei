import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes: React.FC = () => (
  <Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="Home" component={Home} />
    <Screen name="Profile" component={Profile} />
  </Navigator>
);
