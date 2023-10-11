import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
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
  StyledButtonMedio,
  StyledButtonMedioCancelar,
  ButtonText,
  TextInfo,
  Colors,
} from '../components/StyledComponents/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GLOBALCONFIG } from '../Config';

const Suscrip = ({ route, navigation }) => {
  const { manifest } = Constants;
  const uri = GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort;

  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState();

  return (
    <StyledSafeArea>
      <CustomHeader isHome={false} title="Suscripción" color={Colors.greenPet} navigation={navigation} />
      <StyledScrollContainer>
        <InnerContainer>
          <StatusBar style="dark" />
          {/* <PageTitle>LEOPET</PageTitle>
          <Subtitle>Suscribirse</Subtitle>
          <TextInfo>
            Seleccione la forma de pago 
          </TextInfo> */}
          <Text style={{ color: Colors.greenPet, fontSize: 18, margin: 20, fontWeight: 'bold', letterSpacing: 1 }}>
            Seleccione la forma de pago:
          </Text>
        </InnerContainer>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <StyledButtonMedioCancelar onPress={() => navigation.navigate('SuscripcionPay')}>
            <ButtonText>PayPal</ButtonText>
          </StyledButtonMedioCancelar>

          <StyledButtonMedio onPress={() => navigation.navigate('Suscripciontarjeta')}>
            <ButtonText>Tarjeta crédito o débito</ButtonText>
          </StyledButtonMedio>
        </View>
        <View style={{ marginBottom: 30 }}></View>
      </StyledScrollContainer>
    </StyledSafeArea>
  );
};

const styles = StyleSheet.create({
  btnPayPal: {
    padding: 15,
    backgroundColor: Colors.greenPet,
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 5,
    height: 60,
    width: 200,
  },
});

export default Suscrip;
