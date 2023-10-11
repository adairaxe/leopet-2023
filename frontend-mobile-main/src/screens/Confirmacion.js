import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Services
import { apadrinar } from '../services/Manada';

// Header
import CustomHeader from '../components/Headers/CustomHeader';

// Icons
import Animales from '../components/Cards/CardAnimal';

import {
  StyledSafeArea,
  StyledScrollContainer,
  InnerContainer,
  PageTitle,
  Subtitle,
  StyledButton,
  ButtonText,
  StyledButtonMedio,
  StyledButtonMedioCancelar,
  TextInfo,
  Colors,
  ExtraView,
} from '../components/StyledComponents/styles';
import { GLOBALCONFIG } from '../Config';

const Confirmation = ({ route, navigation }) => {
  const { animalId, nombre, descripcion, imagen, fundacion, manadaId, raza, especie, galeria } = route.params;
  const { manifest } = Constants;
  const uri = GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort;

  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState();

  const addManada = async (manadaId) => {
    const jsonValue = await AsyncStorage.getItem('session');
    const data = await JSON.parse(jsonValue);
    setLoading(true);
    return apadrinar(
      {
        manadaId,
        animalId: animalId,
      },
      {
        apiUrl: uri,
        token: data.token,
      },
    )
      .then(() => {
        setLoading(false);
        navigation.navigate('Felicidades', {
          nombre,
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  return (
    <StyledSafeArea>
      <CustomHeader title="Confirmación" color={Colors.greenPet} navigation={navigation} />
      <StyledScrollContainer>
        <InnerContainer>
          <StatusBar style="dark" />
          {/*   <PageTitle>LEOPET</PageTitle>
          <Subtitle>Confirmar</Subtitle>
          <TextInfo>
            Presiona 'APADRINAR' si quiere agregar a {nombre} a la manada, caso contrario presiona en 'CANCELAR'
          </TextInfo> */}
          <Text style={{ color: Colors.greenPet, fontSize: 20, margin: 20, fontWeight: 'bold', letterSpacing: 1 }}>
            ¿Desea apadrinar a {nombre} ?
          </Text>
          <Animales
            nombre={nombre}
            descripcion={descripcion}
            imagen={imagen}
            fundacion={fundacion}
            raza={raza}
            especie={especie}
            galeria={galeria}
          />
        </InnerContainer>
        <ExtraView></ExtraView>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <StyledButtonMedioCancelar onPress={() => navigation.goBack()}>
            <ButtonText>Cancelar</ButtonText>
          </StyledButtonMedioCancelar>

          <StyledButtonMedio onPress={() => addManada(manadaId)}>
            <ButtonText>Apadrinar</ButtonText>
          </StyledButtonMedio>
        </View>

        <View style={{ marginBottom: 30 }}></View>
      </StyledScrollContainer>
    </StyledSafeArea>
  );
};

export default Confirmation;
