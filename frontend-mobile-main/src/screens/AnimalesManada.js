import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/Headers/CustomHeader';
import { StatusBar } from 'expo-status-bar';
import Animales from '../components/Cards/CardAnimal';
import { ActivityIndicator } from 'react-native';
import { Divider } from 'react-native-elements';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Servicios
import { getAnimals } from '../services/Animals';
import { deleteAnimalsManadaApp } from '../services/Manada';

// Cards
import CardManada from '../components/Cards/CardManada';

import {
  StyledSafeArea,
  StyledContainerHome,
  InnerContainer,
  PageLogo,
  PageTitle,
  Subtitle,
  StyledScrollContainer,
  StyledTextInput,
  StyledInputLabel,
  LeftIcon,
  RightIcon,
  StyledButton,
  StyledButtonMedio,
  ButtonText,
  MsgBox,
  ExtraView,
  ExtraText,
  TextLink,
  HeaderView,
  TextInfo,
  Colors,
} from '../components/StyledComponents/styles';
import { GLOBALCONFIG } from '../Config';

const HomeScreen = ({ route, navigation }) => {
  const { manadaId, nombre, galeriamanada, monto, apadrinados, prueba } = route.params;
  const { manifest } = Constants;

  const uri = GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort;

  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadAnimals(0, true);
    });
  }, []);

  const loadAnimals = async (page, reset, cb) => {
    const jsonValue = await AsyncStorage.getItem('session');
    const data = await JSON.parse(jsonValue);
    if (reset) {
      setLoading(true);
    }
    return getAnimals(
      {
        q: null,
        page,
        manada: manadaId,
        limit: 20,
      },
      {
        apiUrl: uri,
        token: data.token,
      },
    )
      .then((data) => {
        setAnimals(reset ? data : [...animals, ...data]);
        console.log(data);
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
  /*  const loadAnimal = () => {
    return animals.map((animal) => {
        return (
          <Animales
            key={animal.id}
            id={animal.id}
            nombre={animal.nombre}
            descripcion={animal.descripcion}
            imagen={animal.imagen}
            fundacion={animal.fundacion}
            navigation={navigation}
          />
        );
    });
  }; */

  const eliminarAnimalManada = async (id) => {
    const jsonValue = await AsyncStorage.getItem('session');
    const data = await JSON.parse(jsonValue);

    return deleteAnimalsManadaApp(
      {
        manadaId: manadaId,
        animalId: id,
      },
      {
        apiUrl: uri,
        token: data.token,
      },
    )
      .then((data) => {
        loadAnimals(0, true);
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
            galeria={animal.galeria}
            isMenuManada={true}
            eliminarAnimalManada={eliminarAnimalManada}
          />
        </TouchableOpacity>
      );
    });
  };

  return (
    <StyledSafeArea>
      <CustomHeader isHome={false} title="Ver Manada" color={'white'} navigation={navigation} />
      <StyledScrollContainer>
        <InnerContainer>
          <StatusBar style="dark" />
          <PageTitle>{nombre}</PageTitle>
          <ExtraView></ExtraView>
          <Subtitle>Monto: $ {monto}</Subtitle>
          <Subtitle>Suscripcion Mensual: $ {monto * apadrinados}</Subtitle>
          <TextInfo>Estos son los animales que pertenecen a tu manada</TextInfo>
          <StyledButtonMedio onPress={() => navigation.navigate('Suscripcion')}>
            <ButtonText>Activar donación</ButtonText>
          </StyledButtonMedio>
          <Divider />
          {/*   {isLoading ? <ActivityIndicator size="large" color={Colors.darklight} /> : loadAnimal()} */}
          {isLoading ? <ActivityIndicator size="large" color={Colors.darklight} /> : loadAnimal(navigation)}
          <View style={{ marginBottom: 30 }}></View>
        </InnerContainer>
      </StyledScrollContainer>
    </StyledSafeArea>
  );
};

export default HomeScreen;
