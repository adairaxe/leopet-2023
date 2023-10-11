import React from 'react';
// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Tabs
import OptionsDrawer from './OptionsDrawer';
//Screens
import CrearManada from '../screens/CrearManada';
import HomeScreen from '../screens/Manadas';
import FundacionScreen from '../screens/FundacionScreen';
import AnimalesManada from '../screens/AnimalesManada';
import FundacionDetalle from '../screens/FundacionDetalle';

//Colors
import { Colors } from '../components/StyledComponents/styles';

const Stack = createStackNavigator();

const FundacionStack = () => {
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
      initialRouteName="Fundaciones"
    >
      <Stack.Screen name="Fundaciones" component={FundacionScreen} />
       <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: Colors.primary,
        }}
        name="Detalle de Fundacion"
        component={FundacionDetalle}
      />  
      {/* <Stack.Screen
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
      /> */}
    </Stack.Navigator>
  );
};

export default FundacionStack;
