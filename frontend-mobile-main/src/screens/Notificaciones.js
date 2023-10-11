import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, TouchableOpacity, Text, Modal } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements';

//Services
import { getNotificaciones, updateNotificacion as updateNotificacionService } from '../services/Notificaciones';

//Formik

// Header
import CustomHeader from '../components/Headers/CustomHeader';
// Icons
import { Octicons, Ionicons } from '@expo/vector-icons';

import {
  StyledSafeArea,
  StyledScrollContainer,
  InnerContainer,
  PageTitle,
  Subtitle,
  StyledFormArea,
  StyledTextInput,
  StyledInputLabel,
  LeftIcon,
  RightIcon,
  StyledButton,
  StyledButtonMedio,
  ButtonText,
  MsgBox,
  ExtraViewMargin,
  ExtraText,
  TextLink,
  TextLinkContent,
  TextInfo,
  Colors,
} from '../components/StyledComponents/styles';
import { GLOBALCONFIG } from '../Config';

const Notificacion = ({ route, navigation }) => {
  const { manifest } = Constants;

  const uri = GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort;

  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState();
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotificaciones(0, true);
    });
  }, []);

  const updateNotificacion = async (actualizacion) => {
    const jsonValue = await AsyncStorage.getItem('session');
    const data = await JSON.parse(jsonValue);
    updateNotificacionService(actualizacion, {
      apiUrl: uri,
      token: data.token,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

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
        setNotificaciones(reset ? data.notificaciones : [...notificaciones, ...data.notificaciones]);
        if (reset) {
          setLoading(false);
        }
        if (cb) {
          cb(data.length != 0);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const loadNotificacion = (navigation) => {
    return notificaciones.map((notificacion) => {
      return (
        <TouchableOpacity
          key={notificacion.id}
          onPress={() => {
            if (!notificacion.leido) {
              updateNotificacion({
                id: notificacion.id,
                leido: true,
                fecha_leido: Date.now(),
              });
            }
            navigation.navigate('NotificacionDetalle', {
              notificacion: notificacion,
              isMenu: 'HOME',
              isEditar: false,
            });
          }}
        >
          <Card containerStyle={{ width: 370, height: 65, borderRadius: 15, elevation: 8, paddingTop: 8 }}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                {
                  <Card.Image
                    style={{ padding: 0, margin: 0, width: 70, height: 50, overflow: 'hidden', borderRadius: 15 }}
                    source={{
                      uri: notificacion.animal.imagen,
                    }}
                  />
                }

                <Card.Divider />

                <Card.Title
                  style={{
                    textAlign: 'left',
                    fontSize: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 15,
                    marginBottom: 2,
                    marginTop: 10,
                  }}
                >
                  <Ionicons name="card" size={20} color={Colors.greenPet} />
                  <Text style={{ fontWeight: 'bold', marginTop: 50, color: Colors.greenPet }}>
                    {' '}
                    {notificacion.animal.nombre + ' Tiene una notificacion'}
                  </Text>
                </Card.Title>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });
  };

  return (
    <StyledSafeArea>
      <CustomHeader title="Notificaciones" color={Colors.greenPet} navigation={navigation} />
      <StyledScrollContainer>
        <InnerContainer>
          <StatusBar style="dark" />

          {isLoading ? <ActivityIndicator size="large" color={Colors.darklight} /> : loadNotificacion(navigation)}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Update', {
                isMenu: 'HOME',
                isEditar: false,
              })
            }
          ></TouchableOpacity>
        </InnerContainer>
      </StyledScrollContainer>
    </StyledSafeArea>
  );
};

export default Notificacion;
