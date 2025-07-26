import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import BootScreen from '../screens/BootScreen';

export type RootStackParamList = {
  Home: undefined;
  Onboarding: undefined;
  Login: undefined;
  OTP: undefined;
  PersonalInfo: undefined;
  BootScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BootScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
        <Stack.Screen name="BootScreen" component={BootScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
