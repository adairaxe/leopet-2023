import React from 'react';
// React Navigation
import { createStackNavigator } from '@react-navigation/stack';

// Tabs
//Screens
import AddAnimal from '../screens/AddAnimal';
import Confirmation from '../screens/Confirmacion';
import CrearManada from '../screens/CrearManada';
import Home from '../screens/Home';
import AnimalApadrinado from '../screens/AnimalApadrinado';
import Suscripcion from '../screens/Suscripcion';
import Suscripciontarjeta from '../screens/Suscripciontarjeta';
import SuscripcionPay from '../screens/SuscripcionPay';
import Notificaciones from '../screens/Notificaciones';
import NotificacionDetalle from '../screens/NotificacionDetalle';
//Colors
import { Colors } from '../components/StyledComponents/styles';
import AnimalDetalle from '../screens/AnimalDetalle';

const Stack = createStackNavigator();

const HomeStack = () => {
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
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: Colors.primary,
        }}
        name="Detalle de Animal"
        component={AnimalDetalle}
      />      
      
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: Colors.primary,
        }}
        name="Agregar A Manada"
        component={AddAnimal}
      />
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
        name="Confirmar"
        component={Confirmation}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: Colors.primary,
        }}
        name="Suscripcion"
        component={Suscripcion}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: Colors.primary,
        }}
        name="Suscripciontarjeta"
        component={Suscripciontarjeta}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: Colors.primary,
        }}
        name="SuscripcionPay"
        component={SuscripcionPay}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: Colors.primary,
        }}
        name="Felicidades"
        component={AnimalApadrinado}
      />
       <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: Colors.primary,
        }}
        name="Notificaciones"
        component={Notificaciones}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: Colors.primary,
        }}
        name="NotificacionDetalle"
        component={NotificacionDetalle}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
