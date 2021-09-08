import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamList>();

export const AuthRoutes: React.FC = () => (
  <Navigator
    initialRouteName="SignIn"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="SignIn" component={SignIn} />
    <Screen name="SignUp" component={SignUp} />
  </Navigator>
);
