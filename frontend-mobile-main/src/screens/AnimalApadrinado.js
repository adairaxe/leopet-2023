import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Services
//Formik
import CardManada from '../components/Cards/CardManada';
import { getManadas } from '../services/Manada';

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

const AnimalApadrinado = ({ route, navigation }) => {
  const { nombre } = route.params;

  return (
    <StyledSafeArea>
      <CustomHeader title="FELICIDADES" color={Colors.greenPet} navigation={navigation} />
      <StyledScrollContainer>
        <InnerContainer>
          <StatusBar style="dark" />
          <PageTitle>FELICIDADES!</PageTitle>
          <Subtitle>Has apadrinado a {nombre}</Subtitle>
          <TextInfo>Puedes ir al apartado de manadas y revisar el listado de animales por manada</TextInfo>
          <Ionicons name="gift" size={100} color={Colors.pie} />
          <View style={{ marginBottom: 10 }}></View>
          <StyledButtonMedio onPress={() => navigation.navigate('Home')}>
            <ButtonText>ACEPTAR</ButtonText>
          </StyledButtonMedio>
        </InnerContainer>

        <View style={{ marginBottom: 30 }}></View>
      </StyledScrollContainer>
    </StyledSafeArea>
  );
};

export default AnimalApadrinado;
