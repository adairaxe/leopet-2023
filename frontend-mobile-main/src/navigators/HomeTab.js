import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Octicons, Ionicons } from '@expo/vector-icons';
import Icon from '@mdi/react'
import { mdiHandHeart } from '@mdi/js';
import { mdiHandHeartOutline } from '@mdi/js';
import { View, TouchableOpacity, ActivityIndicator, StyleSheet,Image } from 'react-native';


import Welcome from '../screens/Home';
import Perfil from '../screens/Perfil';
import ManadaStack from './ManadaStack';
import HomeStack from './HomeStack';
import FundacionStack from './FundacionStack';

import { Colors } from '../components/StyledComponents/styles';

const Tab = createBottomTabNavigator();

const { greenPet } = Colors;

export default function HomeTab() {
  return (
    <Tab.Navigator
      initialRouteName="Welcome"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Animales') {
            //iconName = focused ? 'paw' : 'paw-outline';
            iconName = focused ? require('../assets/icons/pawfill.png') : require('../assets/icons/paw-outline.png');
          } else if (route.name === 'Manadas') {
            //iconName = focused ? 'gift' : 'gift-outline';
            iconName = focused ? require('../assets/icons/dog-fill.png') : require('../assets/icons/dog-outline.png');
          } else if (route.name === 'Fundacion') {
            //iconName = focused ? 'baseline-volunteer-activism' : 'person-outline';
            iconName = focused ? require('../assets/icons/hand-heart.png') : require('../assets/icons/hand-heart-outline.png');
          }

          // You can return any component that you like here!
          //return <Ionicons name={iconName} size={size} color={greenPet} />; 
         return  <Image source={iconName } style={{width:25, height:25}} ></Image>
          
        },
        tabBarActiveTintColor: { greenPet },
        tabBarInactiveTintColor: 'gray',
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'black',
      }}
    >
      {/* tabBarBadge es las burbujas de notificaciones */}
      <Tab.Screen name="Animales" component={HomeStack} /* options={{ tabBarBadge: 4 }}  *//>
      <Tab.Screen name="Manadas" component={ManadaStack} />
      <Tab.Screen name="Fundacion" component={FundacionStack} />
    </Tab.Navigator>
  );
}
