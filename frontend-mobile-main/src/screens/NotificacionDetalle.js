import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, TouchableOpacity, Text, StyleSheet, Image, Modal } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
import { Card } from 'react-native-elements';
import { updateNotificacion as updateNotificacionService } from '../services/Notificaciones';

//Services
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

let DATA = [
  'https://www.pregonagropecuario.com/assets/images/upload/perro_Huky_Siberiano.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCr2tLFj5lGk_3MwhsXpMlzUsGr12iDLkCyA&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW6MXVMYMKVyf5m_GjYC3rsQBVAour5kAjmw&usqp=CAU',
];

const NotificacionDetalle = ({ route, navigation }) => {
  const { notificacion } = route.params;
  const { manifest } = Constants;
  const uri = GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort;

  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState();
  const [defaultRating, setdefaultRating] = useState(notificacion.calificacion || 0);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);

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

  const CustomRatingBar = () => {
    return (
      <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 30 }}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => {
                if (notificacion.calificacion == null || notificacion.calificacion == 0) {
                  setdefaultRating(item);
                }
              }}
            >
              <Image
                style={{ width: 40, height: 40, resizeMode: 'cover' }}
                source={
                  item <= defaultRating
                    ? { uri: 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png' }
                    : { uri: 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png' }
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  renderItem = ({ item }) => {
    return (
      <View>
        <Image style={{ width: 200, height: 200, resizeMode: 'stretch' }} source={{ uri: item }} />
      </View>
    );
  };

  return (
    <StyledSafeArea>
      <CustomHeader
        isHome={false}
        title={'Notificación de ' + notificacion.animal.nombre}
        color={Colors.primary}
        navigation={navigation}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: Colors.beige, paddingBottom: 0 }}>
        <View style={{ flex: 1, justifyContent: 'center', margin: 5 }}>
          <PageTitle>{notificacion.animal.nombre}</PageTitle>
          <CustomRatingBar />
          {(notificacion.calificacion == null || notificacion.calificacion == 0) && (
            <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: Colors.beige }}>
              <StyledButtonMedio>
                <ButtonText
                  onPress={() => {
                    updateNotificacion({
                      id: notificacion.id,
                      calificacion: defaultRating,
                      fecha_calificacion: Date.now(),
                    });
                    notificacion.calificacion = defaultRating;
                  }}
                >
                  Enviar Calificación
                </ButtonText>
              </StyledButtonMedio>
            </View>
          )}
        </View>
      </View>

      <StyledScrollContainer>
        <InnerContainer>
          <StatusBar style="dark" />
          <View style={styles.containerSubtitulo}>
            <Ionicons name="clipboard-outline" size={25} color={Colors.greenPet} />
            <Text style={styles.subtitulo}>Datos del animal</Text>
          </View>

          <View
            style={{
              flex: 1,
              width: 360,
              backgroundColor: Colors.primary,
              borderBottomEndRadius: 15,
              borderBottomStartRadius: 15,
              padding: 5,
              marginBottom: 10,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Especie: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{notificacion.animal.especie}</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Edad: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{notificacion.animal.edad}</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Sexo: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{notificacion.animal.sexo ? 'Macho' : 'Hembra'}</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Raza: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{notificacion.animal.raza}</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Fundación: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{notificacion.actualizacion.fundacion}</Text>
              </View>
            </View>
          </View>

          <View style={styles.containerSubtitulo}>
            <Ionicons name="document-outline" size={25} color={Colors.greenPet} />
            <Text style={styles.subtitulo}>Informe</Text>
          </View>

          <View
            style={{
              flex: 1,
              width: 360,
              backgroundColor: Colors.primary,
              borderBottomEndRadius: 15,
              borderBottomStartRadius: 15,
              padding: 5,
              marginBottom: 10,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Fecha: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{notificacion.actualizacion.fecha}</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Descripción: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{notificacion.actualizacion.descripcion}</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Estado de Salud: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{notificacion.actualizacion.estado_salud}</Text>
              </View>
            </View>
          </View>

          <View style={styles.containerSubtitulo}>
            <Ionicons name="images-outline" size={25} color={Colors.greenPet} />
            <Text style={styles.subtitulo}>Evidencias</Text>
          </View>

          <View style={{ backgroundColor: Colors.beige, padding: 5, height: 200 }}>
            <Carousel
              style={{ justifyContent: 'center' }}
              data={notificacion.actualizacion.galeria.fotos}
              renderItem={renderItem}
              sliderWidth={400}
              itemWidth={200}
            ></Carousel>
          </View>

          {/*   {isLoading ? <ActivityIndicator size="large" color={Colors.darklight} /> : loadManada()} */}
          <View style={{ marginBottom: 30 }}></View>
        </InnerContainer>
      </StyledScrollContainer>
    </StyledSafeArea>
  );
};

const styles = StyleSheet.create({
  containerEtiqueta: {
    flex: 1,
    //backgroundColor: Colors.beige,
    opacity: 0.8,
    borderRadius: 0,
    margin: 2,
    justifyContent: 'flex-start',
  },

  containerInfo: {
    flex: 1,
    //backgroundColor: Colors.beige,
    opacity: 0.8,
    //borderRadius: 10,
    margin: 5,
    justifyContent: 'flex-start',
  },

  etiqueta: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: Colors.black,
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 0,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  valor: {
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 0,
    marginBottom: 0,
  },

  containerSubtitulo: {
    flex: 1,
    flexDirection: 'row',
    width: 360,
    height: 45,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 15,
    margin: 5,
    padding: 8,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.primary,
  },

  subtitulo: {
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 8,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colors.greenPet,
    textAlign: 'right',
  },
});

export default NotificacionDetalle;
