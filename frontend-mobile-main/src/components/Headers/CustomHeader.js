import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import { HeaderView } from '../StyledComponents/styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getNotificaciones } from '../../services/Notificaciones';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { GLOBALCONFIG } from '../../Config';

const Tab = createBottomTabNavigator();

const CustomHeader = ({ title, color, navigation, isHome, isManada, isAnimalDetalle }) => {
  const { manifest } = Constants;
  const uri = GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort;

  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState();
  const [notificaciones, setNotificaciones] = useState([]);
  const [totalNotificacionesNoleidas, setTotalNotificacionesNoleidas] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotificaciones(0, true);
    });
  }, []);

  const loadNotificaciones = async (page, reset, cb) => {
    const jsonValue = await AsyncStorage.getItem('session');
    const data = await JSON.parse(jsonValue);
    if (reset) {
      setLoading(true);
    }
    return getNotificaciones({
      apiUrl: uri,
      token: data.token,
    })
      .then((data) => {
        setNotificaciones(data.notificaciones);
        const result = data.notificaciones.filter((notificacion) => notificacion.leido == false);
        setTotalNotificacionesNoleidas(result.length);
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  return (
    <HeaderView>
      {isHome && (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, marginLeft: 20, justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu-outline" size={40} color={color} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {isHome ? (
        <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ textAlign: 'left', color: 'white', fontSize: 22, fontWeight: 'bold', marginLeft: 5 }}>
            {title}
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'left', color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 70 }}>
            {title}
          </Text>
        </View>
      )}

      {isHome && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 15 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
            <View>
              <Ionicons name="notifications" size={30} color={'white'} />

              {totalNotificacionesNoleidas > 0 &&
                totalNotificacionesNoleidas > 0 &&
                totalNotificacionesNoleidas < 10 && (
                  <Badge
                    value={totalNotificacionesNoleidas}
                    status="error"
                    containerStyle={{ position: 'absolute', top: -4, right: 0 }}
                  />
                )}

              {totalNotificacionesNoleidas > 0 &&
                totalNotificacionesNoleidas >= 10 &&
                totalNotificacionesNoleidas <= 99 && (
                  <Badge
                    value={totalNotificacionesNoleidas}
                    status="error"
                    containerStyle={{ position: 'absolute', top: -4, right: -10 }}
                  />
                )}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </HeaderView>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: 35,
    height: 35,
    top: 0,
  },
});

const click = () => {
  alert('prueba');
};

export default CustomHeader;
