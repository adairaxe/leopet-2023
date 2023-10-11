import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
import { Card } from 'react-native-elements';

//Services
//Formik
import CardManada from '../components/Cards/CardManada';
import { getManadas } from '../services/Manada';
import Animales from '../components/Cards/CardAnimal';
import { getAnimalsFundacionApp } from '../services/Animals';

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
  ViewNombreLarge,
  ExtraView,
} from '../components/StyledComponents/styles';
import { GLOBALCONFIG } from '../Config';

let DATA = [
  'https://www.pregonagropecuario.com/assets/images/upload/perro_Huky_Siberiano.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCr2tLFj5lGk_3MwhsXpMlzUsGr12iDLkCyA&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW6MXVMYMKVyf5m_GjYC3rsQBVAour5kAjmw&usqp=CAU',
];

const FundacionDetalle = ({ route, navigation }) => {
  const { nombre, fundacionId, logo, email, telefono, contacto } = route.params;

  const { manifest } = Constants;
  const uri = GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort;

  // Varibles
  const [animals, setAnimals] = useState([]);
  const [isLoading, setLoading] = useState();
  const [isTipoAnimal, setTipoAnimal] = useState(false);
  const [especieAnimal, setEspecieAnimal] = useState(null);
  const [error, setError] = useState();

  // Cargar animales al renderizar el componente
  useEffect(() => {
    loadAnimals(0, true);
  }, []);

  const loadAnimals = async (page, reset, cb) => {
    const jsonValue = await AsyncStorage.getItem('session');
    const data = await JSON.parse(jsonValue);
    if (reset) {
      setLoading(true);
    }
    return getAnimalsFundacionApp(
      {
        q: null,
        page,
        id_fundacion: fundacionId,
        limit: 20,
      },
      {
        apiUrl: uri,
        token: data.token,
      },
    )
      .then((data) => {
        setAnimals(reset ? data : [...animals, ...data]);
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

  const loadAnimal = (navigation) => {
    return animals.map((animal) => {
      return (
        <TouchableOpacity
          key={animal.id}
          onPress={() =>
            navigation.navigate('Detalle de Animal', {
              animalId: animal.id,
              nombre: animal.nombre,
              descripcion: animal.descripcion,
              imagen: animal.imagen,
              fundacion: animal.fundacion,
              raza: animal.raza,
              especie: animal.especie,
              galeria: animal.galeria,
            })
          }
        >
          <Animales
            id={animal.id}
            nombre={animal.nombre}
            descripcion={animal.descripcion}
            imagen={animal.imagen}
            fundacion={animal.fundacion}
            navigation={navigation}
            raza={animal.raza}
            especie={animal.especie}
            fundacion_id={animal.fundacion_id}
            isMenuManada={false}
            galeria={animal.galeria}
          />
        </TouchableOpacity>
      );
    });
  };

  return (
    <StyledSafeArea>
      <CustomHeader isHome={false} title="Detalle de Fundacion" color={Colors.primary} navigation={navigation} />

      <View style={{ flexDirection: 'column', backgroundColor: Colors.beige }}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              color: Colors.greenPet,
              marginBottom: 10,
              fontWeight: 'bold',
            }}
          >
            {nombre}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: Colors.beige,
            padding: 5,
            alignItems: 'center',
            // marginLeft: 35,
          }}
        >
          {/* <Ionicons name={'paw'} size={50} color={Colors.greenPet}/> */}

          {!logo ? (
            <View>
              <ActivityIndicator size="large" color={Colors.darklight} />
              <Text style={{ textAlign: 'center' }}>Cargando Imagen...</Text>
            </View>
          ) : fundacionId == 3 ? (
            <Card.Image
              style={{ padding: 0, margin: 2, width: 120, height: 120, overflow: 'hidden', borderRadius: 100 }}
              source={require('../assets/img/logo.png')}
            />
          ) : (
            <Card.Image
              style={{ padding: 0, margin: 2, width: 70, height: 70, overflow: 'hidden', borderRadius: 15 }}
              source={{
                uri: logo,
              }}
            />
          )}
        </View>

        <View style={{ flexDirection: 'row', marginLeft: 50 }}>
          <View>
            <Ionicons name={'call'} size={18} color={Colors.greenPet} />
          </View>
          <View style={styles.containerEtiqueta}>
            <Text style={styles.etiqueta}>Teléfono: </Text>
          </View>
          <View style={styles.containerValor}>
            <Text style={styles.valor}>{telefono}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginLeft: 50 }}>
          <View>
            <Ionicons name={'mail'} size={18} color={Colors.greenPet} />
          </View>
          <View style={styles.containerEtiqueta}>
            <Text style={styles.etiqueta}>Email: </Text>
          </View>
          <View style={styles.containerValor}>
            <Text style={styles.valor}>{email}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginLeft: 50 }}>
          <View>
            <Ionicons name={'person'} size={18} color={Colors.greenPet} />
          </View>
          <View style={styles.containerEtiqueta}>
            <Text style={styles.etiqueta}>Contacto: </Text>
          </View>
          <View style={styles.containerValor}>
            <Text style={styles.valor}>{contacto}</Text>
            <Text></Text>
          </View>
        </View>
      </View>

      <StyledScrollContainer>
        <InnerContainer>
          <StatusBar style="dark" />
          {isLoading ? <ActivityIndicator size="large" color={Colors.darklight} /> : loadAnimal(navigation)}
          <View style={{ marginBottom: 30 }}></View>
        </InnerContainer>
      </StyledScrollContainer>
    </StyledSafeArea>
  );
};

const styles = StyleSheet.create({
  containerEtiqueta: {
    flex: 0.4,
    backgroundColor: Colors.beige,
    opacity: 0.8,
  },

  containerValor: {
    flex: 1,
    backgroundColor: Colors.beige,
    opacity: 0.8,
  },

  containerInfo: {
    flex: 1,
    backgroundColor: Colors.beige,
    opacity: 0.8,
    //borderRadius: 10,
    justifyContent: 'flex-start',
  },

  etiqueta: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: Colors.black,
    textAlign: 'left',
    marginLeft: 15,
    marginTop: 0,
    fontWeight: 'bold',
  },

  valor: {
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
  },

  containerSubtitulo: {
    flex: 1,
    flexDirection: 'row',
    width: 360,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 15,
    margin: 5,
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.primary,
  },

  subtitulo: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 8,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colors.greenPet,
    textAlign: 'right',
  },
});

export default FundacionDetalle;
