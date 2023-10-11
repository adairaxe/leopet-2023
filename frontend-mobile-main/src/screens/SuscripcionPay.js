import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, Text } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Formik para el Formulario
import { Formik } from 'formik';

// Services
import { createManada } from '../services/Manada';

// Header
import CustomHeader from '../components/Headers/CustomHeader';
// Icons
import { Octicons } from '@expo/vector-icons';

// Styled Components
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
  StyledButton,
  StyledButtonMedio,
  ButtonText,
  MsgBox,
  TextInfo,
  Colors,
} from '../components/StyledComponents/styles';
import { GLOBALCONFIG } from '../Config';

const PayPal = ({ navigation }) => {
  const { manifest } = Constants;
  const uri = GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort;
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState();

  const createNewManada = async (manada) => {
    const jsonValue = await AsyncStorage.getItem('session');
    const data = await JSON.parse(jsonValue);
    setLoading(true);
    return createManada(manada, {
      apiUrl: uri,
      token: data.token,
    })
      .then(() => {
        setLoading(false);
        navigation.push('Manadas');
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  return (
    <StyledSafeArea>
      <CustomHeader isHome={false} title="Suscripción con PayPal" color={Colors.greenPet} navigation={navigation} />
      <StyledScrollContainer>
        <InnerContainer>
          <StatusBar style="dark" />
          {/* <PageTitle>LEOPET</PageTitle>
          <Subtitle>Suscribirse</Subtitle>
          <TextInfo style={{ marginBottom: 30 }}>Empieza a donar</TextInfo> */}
          <Text style={{ color: Colors.greenPet, fontSize: 18, margin: 20, fontWeight: 'bold', letterSpacing: 1 }}>
            ¡Empieza a donar!
          </Text>
          <Formik
            initialValues={{
              nombre: '',
              monto: '',
            }}
            onSubmit={(values) => {
              createNewManada(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextImput
                  label="Correo*"
                  icon="mail"
                  placeholder="usuario@email.com"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange('nombre')}
                  onBlur={handleBlur('nombre')}
                  value={values.nombre}
                  keyboardType="email-address"
                />

                <MyTextImput
                  label="Contraseña*"
                  icon="lock"
                  placeholder="******"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange('monto')}
                  onBlur={handleBlur('monto')}
                  value={values.monto}
                  keyboardType="numeric"
                />

                {error && <MsgBox>Debe Completar todos los Campos Correctamente</MsgBox>}

                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <StyledButtonMedio>
                    <ButtonText>
                      {isLoading ? <ActivityIndicator size="large" color={Colors.darklight} /> : 'Suscribirse'}
                    </ButtonText>
                  </StyledButtonMedio>
                </View>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledScrollContainer>
    </StyledSafeArea>
  );
};

// Componente para reutilizar los Imputs de acuerdo con sus props
const MyTextImput = ({ label, icon, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={Colors.greenPet} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
    </View>
  );
};

export default PayPal;
