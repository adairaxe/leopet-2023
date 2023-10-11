import React from 'react';
// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Tabs
import OptionsDrawer from './OptionsDrawer';
//Screens
import CrearManada from '../screens/CrearManada';
import HomeScreen from '../screens/Manadas';
import AnimalesManada from '../screens/AnimalesManada';
import Notificaciones from '../screens/Notificaciones';
//Colors
import { Colors } from '../components/StyledComponents/styles';

const Stack = createStackNavigator();

const ManadaStack = () => {
  return (
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
      initialRouteName="Manadas"
    >
      <Stack.Screen name="Manadas" component={HomeScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: Colors.primary,
        }}
        name="Crear Manada"
        component={CrearManada}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: Colors.primary,
        }}
        name="Ver Manada"
        component={AnimalesManada}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: Colors.primary,
        }}
        name="Notificaciones"
        component={Notificaciones}
      />
    </Stack.Navigator>
    
  );
};

export default ManadaStack;
