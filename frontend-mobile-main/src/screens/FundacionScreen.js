import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../components/Headers/CustomHeader';
import Constants from 'expo-constants';
import Fundacion from '../components/Cards/CardFundacion';
import { ActivityIndicator, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';

// Servicios
import { getFundacion } from '../services/Fundacion';

import {
  StyledSafeArea,
  InnerContainer,
  PageTitle,
  StyledScrollContainer,
  StyledButton,
  StyledButtonMedio,
  ButtonText,
  TextInfo,
  Colors,
  ExtraView,
} from '../components/StyledComponents/styles';
import styled from 'styled-components';
import { GLOBALCONFIG } from '../Config';

const FundacionScreen = ({ navigation }) => {
  const { manifest } = Constants;
  const uri = GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort;

  // Varibles
  const [fundaciones, setFundaciones] = useState([]);
  const [isLoading, setLoading] = useState();
  const [isTipoAnimal, setTipoAnimal] = useState(false);
  const [especieAnimal, setEspecieAnimal] = useState(null);
  const [error, setError] = useState();

  // Cargar animales al renderizar el componente
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFundaciones(0, true);
    });
  }, []);

  const loadFundaciones = async (page, reset, cb) => {
    const jsonValue = await AsyncStorage.getItem('session');
    const data = await JSON.parse(jsonValue);
    if (reset) {
      setLoading(true);
    }
    return getFundacion(
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
        setFundaciones(reset ? data : [...fundaciones, ...data]);
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
  const loadFundacion = (navigation) => {
    return fundaciones.map((fundacion) => {
      return (
        <TouchableOpacity
          key={fundacion.id}
          onPress={() =>
            navigation.navigate('Detalle de Fundacion', {
              fundacionId: fundacion.id,
              nombre: fundacion.nombre,
              logo: fundacion.logo,
              email: fundacion.user.email,
              telefono: fundacion.telefono,
              contacto: fundacion.user.nombres + ' ' + fundacion.user.apellidos,
            })
          }
        >
          <Fundacion
            id={fundacion.id}
            nombre={fundacion.nombre}
            logo={fundacion.logo}
            direccion={fundacion.direccion}
            telefono={fundacion.telefono}
            email={fundacion.user.email}
          />
        </TouchableOpacity>
      );
    });
  };

  return (
    <StyledSafeArea>
      <CustomHeader isHome={true} title="Fundaciones" color={Colors.primary} navigation={navigation} />
      <StyledScrollContainer>
        <InnerContainer>
          <StatusBar style="dark" />
          {/* <PageTitle>LEOPET</PageTitle>
          <TextInfo>En esta sección encontrarás a los animales que están registrados por diversas Fundaciones</TextInfo> */}

          <Divider />
          {isLoading ? <ActivityIndicator size="large" color={Colors.darklight} /> : loadFundacion(navigation)}
          <ExtraView></ExtraView>
          <ExtraView></ExtraView>
        </InnerContainer>
      </StyledScrollContainer>
    </StyledSafeArea>
  );
};

const styles = StyleSheet.create({
  filtroButton: {
    backgroundColor: Colors.pinkPet,
    width: 140,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  filtroTextButton: {
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: 16,
  },
});

export default FundacionScreen;
