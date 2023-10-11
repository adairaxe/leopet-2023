import React, { useState, useEffect } from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeTab from './HomeTab';
import HomeStack from './HomeStack';
import Perfil from '../screens/Perfil';
import Suscripcion from '../screens/Suscripcion';

import {
  StyledSafeAreaLogin,
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  Subtitle,
  StyledFormArea,
  StyledTextInput,
  StyledInputLabel,
  LeftIcon,
  RightIcon,
  circleIcons,
  StyledButton,
  StyledButtonFacebook,
  ButtonText,
  MsgBox,
  ExtraView,
  ExtraViewMedia,
  ExtraViewLeft,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors,
} from '../components/StyledComponents/styles';
import { BackgroundImage } from 'react-native-elements/dist/config';
import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge';

const Drawer = createDrawerNavigator();

export default function OptionsDrawer() {
  /* return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Animales" component={HomeTab} />
        <Drawer.Screen name="Perfil" component={Perfil} />
        <Drawer.Screen name="Suscripción" component={Suscripcion} />
        <Drawer.Screen name="Cerrar sesión" component={HomeTab} />
      </Drawer.Navigator>
  );
} 
 */
/* export function DrawerNavigation(){ */
  return (
    <Drawer.Navigator initialRouteName="Home"
      drawerContent={(props)=> <MenuItems {...props}/>}
    
    >

      <Drawer.Screen name="Animales" component={HomeTab} />
      <Drawer.Screen name="Perfil" component={Perfil} />
      <Drawer.Screen name="Suscripción" component={Suscripcion} />
      <Drawer.Screen name="Cerrar sesión" component={HomeTab} />
    </Drawer.Navigator>
);

}

const MenuItems=({navigation})=>{

  const [user, setUser] = useState([]);
  
  useEffect(() => {
    //const unsubscribe = navigation.addListener('focus', () => {
      extraerUsuario();
    //});
  }, []);

  

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('session');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  const extraerUsuario= async()=>{
    const jsonValue = await AsyncStorage.getItem('session');
    const data = await JSON.parse(jsonValue);    
    setUser(data);    
  }





  return(
    <DrawerContentScrollView style={styles.container}>
   
     <View style={{justifyContent:'center', alignItems:'center'}}>
      <Image
          source={require('../assets/img/logo.png') }
          style={styles.imagen}
      /> 
     
      <Text style={styles.txtUser}>{user.nombres+" "+user.apellidos}</Text>
      <Text style={styles.btnText}>{user.email}</Text>
      <ExtraView></ExtraView>

    </View>

    <View style={styles.btnContainer}>
      <Ionicons name="paw" size={15} color={Colors.greenPet} />
      <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btnText}>Suscripción</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.btnContainer}>
      <Ionicons name="person" size={15} color={Colors.greenPet} />
      <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btnText}>Perfil</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.btnContainer}>
      <Ionicons name="power" size={15} color={Colors.greenPet} />
      <TouchableOpacity style={styles.btnContainer} 
      onPress={logout}
      >
          <Text style={styles.btnText}>Cerrar sesión</Text>
        </TouchableOpacity>
    </View>
       
      

    </DrawerContentScrollView>
   
  )
}

const styles=StyleSheet.create({
  container:{
    padding:15,
  },
  imagen:{
    width: 100, 
    height: 100,
    borderRadius:100,
    margin:20,
    marginBottom:35
   
  },
  btnContainer:{
    /* backgroundColor:'red', */
    flexDirection: 'row',
   /*  marginBottom:15,
    padding:5 */
    marginLeft:10,
    marginBottom:10
   
  },
  btnText:{
    fontSize: 16,
    color: Colors.greenPet,
    marginLeft:5,
    marginTop:0,
    
  },
  txtUser:{
    fontSize: 16,
    color: Colors.greenPet,
    marginLeft:5,
    marginTop:0,
    fontWeight:'bold'
    
  }
})
