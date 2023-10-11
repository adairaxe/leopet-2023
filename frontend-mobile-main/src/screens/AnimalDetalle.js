import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, TouchableOpacity, Text, StyleSheet, Image, Modal } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
import { Card } from 'react-native-elements';

//Services
//Formik
import CardManada from '../components/Cards/CardManada';
import { getManadas } from '../services/Manada';
import Animales from '../components/Cards/CardAnimal';
import { getAnimals } from '../services/Animals';

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
  ExtraView,
} from '../components/StyledComponents/styles';
import { GLOBALCONFIG } from '../Config';

let DATA = [
  'https://www.pregonagropecuario.com/assets/images/upload/perro_Huky_Siberiano.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCr2tLFj5lGk_3MwhsXpMlzUsGr12iDLkCyA&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW6MXVMYMKVyf5m_GjYC3rsQBVAour5kAjmw&usqp=CAU',
];

const AnimalDetalle = ({ route, navigation }) => {
  const {
    animalId,
    nombre,
    especie,
    raza,
    descripcion,
    imagen,
    fundacion,
    edad,
    peso,
    esterilizacion,
    vacunacion,
    desparasitacion,
    enfermedades,
    fecha_rescate,
    fecha_registro,
    sexo,
    galeria,
  } = route.params;
  const { manifest } = Constants;

  const uri = GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort;

  const [manadas, setManadas] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState();

  useEffect(() => {
    loadManadas(0, true);
  }, []);

  const loadManadas = async (page, reset, cb) => {
    const jsonValue = await AsyncStorage.getItem('session');
    const data = await JSON.parse(jsonValue);
    if (reset) {
      setLoading(true);
    }
    return getManadas(
      {
        q: null,
        page,
        limit: 20,
      },
      {
        apiUrl: uri,
        token: data.token,
      },
    )
      .then((data) => {
        setManadas(reset ? data : [...manadas, ...data]);
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

  const loadManada = () => {
    return manadas.map((manada) => {
      return (
        <TouchableOpacity
          key={manada.id}
          onPress={() =>
            navigation.navigate('Confirmar', {
              animalId,
              nombre,
              descripcion,
              imagen,
              fundacion,
              manadaId: manada.id,
              galeria: manada.galeria,
            })
          }
        >
          <CardManada isAgregar={true} key={manada.id} nombre={manada.nombre} monto={manada.monto} />
        </TouchableOpacity>
      );
    });
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
      <CustomHeader isHome={false} title="Detalle de animal" color={Colors.primary} navigation={navigation} />

      <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: Colors.beige, paddingBottom: 0 }}>
        <View style={{ flex: 1, justifyContent: 'center', margin: 5 }}>
          <PageTitle>{nombre}</PageTitle>
        </View>
      </View>

      <View style={{ backgroundColor: Colors.beige, padding: 5, height: 200 }}>
        <Carousel
          style={{ justifyContent: 'center' }}
          data={galeria.fotos}
          renderItem={renderItem}
          sliderWidth={400}
          itemWidth={200}
        ></Carousel>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: Colors.beige }}>
        <StyledButtonMedio>
          <ButtonText
            onPress={() =>
              navigation.navigate('Agregar A Manada', {
                animalId: animalId,
                nombre: nombre,
                descripcion: descripcion,
                imagen: imagen,
                fundacion: fundacion,
                raza: raza,
                especie: especie,
                galeria: galeria,
              })
            }
          >
            Apadrinar
          </ButtonText>
        </StyledButtonMedio>
      </View>

      <StyledScrollContainer>
        <InnerContainer>
          <StatusBar style="dark" />

          <View style={styles.containerSubtitulo}>
            <Ionicons name="clipboard-outline" size={25} color={Colors.greenPet} />
            <Text style={styles.subtitulo}>Información</Text>
          </View>

          <View
            style={{
              flex: 1,
              width: '100%',
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
                <Text style={styles.valor}>{especie}</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Edad: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{edad} años</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Sexo: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{sexo == 1 ? 'Macho' : 'Hembra'}</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Raza: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{raza}</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Fundación: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{fundacion}</Text>
              </View>
            </View>
            <ExtraView></ExtraView>
          </View>

          <View style={styles.containerSubtitulo}>
            <Ionicons name="medkit-outline" size={25} color={Colors.greenPet} />
            <Text style={styles.subtitulo}>Salud</Text>
          </View>

          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: Colors.primary,
              borderBottomEndRadius: 15,
              borderBottomStartRadius: 15,
              padding: 5,
              marginBottom: 10,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Peso: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{peso} Kg</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Esterilización: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{esterilizacion == 1 ? 'Si' : 'No'}</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Vacunación: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{vacunacion == 1 ? 'Si' : 'No'}</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Desparasitación: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{desparasitacion == 1 ? 'Si' : 'No'}</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Enfermedades: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{enfermedades}</Text>
              </View>
            </View>
            <ExtraView></ExtraView>
          </View>

          <View style={styles.containerSubtitulo}>
            <Ionicons name="clipboard-outline" size={25} color={Colors.greenPet} />
            <Text style={styles.subtitulo}>Historia</Text>
          </View>

          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: Colors.primary,
              borderBottomEndRadius: 15,
              borderBottomStartRadius: 15,
              padding: 5,
              marginBottom: 10,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Fecha de rescate: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{fecha_rescate}</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Fecha registro: </Text>
              </View>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{fecha_registro}</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.etiqueta}>Descripción: </Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.containerEtiqueta}>
                <Text style={styles.valor}>{descripcion}</Text>
              </View>
            </View>
            <ExtraView></ExtraView>
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
    width: '100%',
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

export default AnimalDetalle;
