import React from 'react';
// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Tabs
import OptionsDrawer from './OptionsDrawer';
//Screens
import Login from '../screens/Login';
import Signup from '../screens/Signup';

//Colors
import { Colors } from '../components/StyledComponents/styles';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: Colors.tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.greenPet,
            headerTransparent: false,
            headerTitle: 'Registro de Usuario',
          }}
          name="Signup"
          component={Signup}
        />
        <Stack.Screen name="Welcome" component={OptionsDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;