import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from './screens/splash';
import TheMap from './screens/map';
import Details from './screens/details';
import Face from './screens/face';
import Options from './screens/options';
import Qr from './screens/qr';
import User from './screens/user';
import Clerk from './screens/clerk';
import Air from './screens/air';
import Scan from './screens/scan';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: '#EEB0BC',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            
          },
        }}
      >
        <Stack.Screen 
        name="Splash" 
        component={Splash} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Options" 
        component={Options} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Face" 
        component={Face} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="User" 
        component={User} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Clerk" 
        component={Clerk} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Air" 
        component={Air} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="TheMap" 
        component={TheMap} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Details" 
        component={Details} 
        options={{ headerShown: false}} 
      />
       <Stack.Screen 
        name="Qr" 
        component={Qr} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Scan" 
        component={Scan} 
        options={{ headerShown: false}} 
      />
      
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}