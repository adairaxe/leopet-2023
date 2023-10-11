import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { View, ActivityIndicator, Image, StyleSheet, LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

// Services
import { login } from '../services/User';
import { loginSocialApp } from '../services/User';

//Formik
import { Formik } from 'formik';

// Icons
import { Octicons, Ionicons } from '@expo/vector-icons';

// KeyboardWrapper
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

import {
  StyledSafeAreaLogin,
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  Subtitle,
  StyledFormArea,
  StyledTextInput,
  StyledInputLabel,
  LeftIcon,
  RightIcon,
  circleIcons,
  StyledButton,
  StyledButtonFacebook,
  ButtonText,
  MsgBox,
  ExtraView,
  ExtraViewMedia,
  ExtraViewLeft,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors,
} from '../components/StyledComponents/styles';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { GLOBALCONFIG } from '../Config';

LogBox.ignoreLogs(['Require cycle:']);

const Login = ({ navigation }) => {
  // Obtener la URL si estoy con un dispositivo externo
  const { manifest } = Constants;

  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Cargar url del backend al probar la app en un dispositivo físico
  const uri = GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort;

  // Guarda el token con los datos del usuario en el AsyncStorage del dispositivo
  const _storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('session', jsonValue);
    } catch (error) {
      setError(true);
    }
  };

  const iniciarSesion = ({ correo, contrasenia, nombres, tipoLogin }) => {
    setLoading(true);
    login(
      {
        correo,
        contrasenia,
        nombres,
        tipoLogin,
      },
      {
        apiUrl: uri,
      },
    )
      .then((user) => {
        _storeData(user);
        setLoading(false);
        navigation.navigate('Welcome');
        setError(false);
        console.log('Login!');
      })
      .catch((err) => {
        console.log(err.message);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const iniciarSesionSocialApp = (email, nombre) => {
    setLoading(true);
    const user = {
      cedula: '0000000000',
      nombres: nombre,
      apellidos: 'NN',
      telefono: 'NN',
      email: email,
      direccion: 'NN',
      password: '',
      role: 3,
    };
    loginSocialApp(
      {
        user,
      },
      {
        apiUrl: uri,
      },
    )
      .then((user) => {
        _storeData(user);
        setLoading(false);
        navigation.navigate('Welcome');
        setError(false);
        console.log('Login!');
      })
      .catch((err) => {
        console.log(err.message);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const handleGoogleSingnin = () => {
    const config = {
      androidClientId: `721851389348-r3qj900dlqdqk3864gbb7hk9smso4e6v.apps.googleusercontent.com`,
      scopes: ['profile', 'email'],
    };

    Google.logInAsync(config)
      .then((result) => {
        const { type, user, accessToken } = result;
        if (type == 'success') {
          const { email, name, photoUrl } = user;
          console.log('Inicio Sesion google');
          console.log(user);
          console.log(accessToken);
          iniciarSesionSocialApp(user.email, user.name);
        } else {
          console.log('Cancelo Inicio');
        }
      })
      .catch((error) => {
        console.log('errrr');
        console.log(error);
      });
  };

  async function logInFacebook() {
    try {
      await Facebook.initializeAsync({
        appId: '498255594978887',
      });
      const { type, token, expirationDate, permissions, declinedPermissions, UserData } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile', 'email'],
        });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?fields=id%2Cname%2Cemail&access_token=${token}`);
        const usuario = await response.json();
        console.log(usuario);
        iniciarSesionSocialApp(usuario.email, usuario.name);
      } else {
        console.log('Cancelo Inicio Facebook');
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <StyledSafeAreaLogin>
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <InnerContainer>
            <StatusBar style="dark" />
            <PageLogo resizeMode="cover" source={require('../assets/img/logo.png')} />
            <Formik
              initialValues={{ correo: '', contrasenia: '' }}
              onSubmit={(values, handleReset) => {
                iniciarSesion(values);
                handleReset;
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, handleReset }) => (
                <StyledFormArea>
                  <MyTextImput
                    label="Correo"
                    icon="mail"
                    placeholder="Ingrese su correo"
                    placeholderTextColor={Colors.darklight}
                    onChangeText={handleChange('correo')}
                    onBlur={handleBlur('correo')}
                    value={values.correo}
                    keyboardType="email-address"
                  />
                  <MyTextImput
                    label="Contraseña"
                    icon="lock"
                    placeholder="Ingrese su contraseña"
                    placeholderTextColor={Colors.darklight}
                    onChangeText={handleChange('contrasenia')}
                    onBlur={handleBlur('contrasenia')}
                    value={values.contrasenia}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                  />

                  {error && <MsgBox>Usuario o Contraseña son incorrectos</MsgBox>}

                  <ExtraViewLeft>
                    <TextLink
                      onPress={() => {
                        navigation.navigate('Signup');
                      }}
                    >
                      <TextLinkContent>¿Olvidó la contraseña?</TextLinkContent>
                    </TextLink>
                  </ExtraViewLeft>

                  <View style={styles.viewSocialMedia}>
                    <TouchableOpacity onPress={logInFacebook}>
                      <Image source={require('../assets/icons/facebook.png')} style={styles.imagen}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleGoogleSingnin}>
                      <Image source={require('../assets/icons/google.png')} style={styles.imagen}></Image>
                    </TouchableOpacity>
                  </View>

                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>
                      {loading ? <ActivityIndicator size="large" color={Colors.darklight} /> : 'Iniciar Sesión'}
                    </ButtonText>
                  </StyledButton>

                  <ExtraView>
                    <ExtraText>¿Aún no tienes cuenta? </ExtraText>
                    <TextLink
                      onPress={() => {
                        navigation.navigate('Signup');
                      }}
                    >
                      <TextLinkContent>Regístrate</TextLinkContent>
                    </TextLink>
                  </ExtraView>
                </StyledFormArea>
              )}
            </Formik>
          </InnerContainer>
        </StyledContainer>
      </KeyboardAvoidingWrapper>
    </StyledSafeAreaLogin>
  );
};

// Componente para reutilizar los Imputs de acuerdo con sus props
const MyTextImput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={Colors.greenPet} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={Colors.greenPet} />
        </RightIcon>
      )}
    </View>
  );
};

// Estilos para LoginScreen
const styles = StyleSheet.create({
  imagen: {
    width: 48,
    height: 48,
    borderRadius: 100,
    top: 10,
    bottom: 60,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 60,
  },

  viewSocialMedia: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});

const click = () => {
  alert('prueba');
};

export default Login;
