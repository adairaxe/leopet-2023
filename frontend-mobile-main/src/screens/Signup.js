import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';

//Services
import { register } from '../services/User';
//Formik
import { Formik } from 'formik';

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

const Signup = ({ navigation }) => {
  const { manifest } = Constants;
  const uri = GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort;

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const registerUser = (values) => {
    setLoading(true);

    return register(
      {
        user: {
          ...values,
          role: 3,
        },
      },
      {
        apiUrl: uri,
      },
    )
      .then(() => {
        setLoading(false);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const validar = (values) => {
    if (values.cedula == null) {
      alert('Falta Cedula');
      return false;
    }
    if (values.nombres == null) {
      alert('Falta Nombres');
      return false;
    }
    if (values.apellidos == null) {
      alert('Falta Apellidos');
      return false;
    }
    if (values.telefono == null) {
      alert('Falta Telefono');
      return false;
    }
    if (values.email == null) {
      alert('Falta Email');
      return false;
    }
    if (values.password == null) {
      alert('Falta Password');
      return false;
    }
    if (values.confirmPassword == null) {
      alert('Falta Confirmar Password');
      return false;
    }

    if (isNaN(values.cedula)) {
      alert('Cedula debe ser numero');
      return false;
    }

    if (!verificarCedula(values.cedula)) {
      alert('Cedula incorrecta');
      return false;
    }

    if (!validarEmail(values.email)) {
      alert('Correo incorrecto');
      return false;
    }

    if (values.cedula.length != 10) {
      alert('Cedula de 10 digitos');
      return false;
    }

    if (values.nombres.length == 0) {
      alert('Falta Nombres');
      return false;
    }
    if (values.apellidos.length == 0) {
      alert('Falta Apellidos');
      return false;
    }
    if (values.telefono.length == 0) {
      alert('Falta Telefono');
      return false;
    }
    if (values.email.length == 0) {
      alert('Falta Email');
      return false;
    }
    if (values.password.length < 8) {
      alert('Falta Password');
      return false;
    }
    if (values.confirmPassword != values.password) {
      alert('Falta Confirmar Password');
      return false;
    }
    return true;
  };

  const verificarCedula = (cedula) => {
    //Obtenemos el digito de la region que sonlos dos primeros digitos
    var digito_region = cedula.substring(0, 2);

    //Pregunto si la region existe ecuador se divide en 24 regiones
    if (digito_region >= 1 && digito_region <= 24) {
      // Extraigo el ultimo digito
      var ultimo_digito = cedula.substring(9, 10);

      //Agrupo todos los pares y los sumo
      var pares =
        parseInt(cedula.substring(1, 2)) +
        parseInt(cedula.substring(3, 4)) +
        parseInt(cedula.substring(5, 6)) +
        parseInt(cedula.substring(7, 8));

      //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
      var numero1 = cedula.substring(0, 1);
      var numero1 = numero1 * 2;
      if (numero1 > 9) {
        var numero1 = numero1 - 9;
      }

      var numero3 = cedula.substring(2, 3);
      var numero3 = numero3 * 2;
      if (numero3 > 9) {
        var numero3 = numero3 - 9;
      }

      var numero5 = cedula.substring(4, 5);
      var numero5 = numero5 * 2;
      if (numero5 > 9) {
        var numero5 = numero5 - 9;
      }

      var numero7 = cedula.substring(6, 7);
      var numero7 = numero7 * 2;
      if (numero7 > 9) {
        var numero7 = numero7 - 9;
      }

      var numero9 = cedula.substring(8, 9);
      var numero9 = numero9 * 2;
      if (numero9 > 9) {
        var numero9 = numero9 - 9;
      }

      var impares = numero1 + numero3 + numero5 + numero7 + numero9;

      //Suma total
      var suma_total = pares + impares;

      //extraemos el primero digito
      var primer_digito_suma = String(suma_total).substring(0, 1);

      //Obtenemos la decena inmediata
      var decena = (parseInt(primer_digito_suma) + 1) * 10;

      //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
      var digito_validador = decena - suma_total;

      //Si el digito validador es = a 10 toma el valor de 0
      if (digito_validador == 10) var digito_validador = 0;

      //Validamos que el digito validador sea igual al de la cedula
      if (digito_validador == ultimo_digito) {
        return true;
      } else {
        return false;
      }
    } else {
      // imprimimos en consola si la region no pertenece
      return false;
    }
  };

  const validarEmail = (email) => {
    console.log(email);
    if (
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        email,
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <StyledSafeArea>
      <StyledScrollContainer>
        <InnerContainer>
          <StatusBar style="dark" />
          {/*  <PageTitle>LEOPET</PageTitle>
          <Subtitle>Regístrate</Subtitle> */}
          <TextInfo>Completa los siguientes datos para crear una cuenta en Leopet</TextInfo>
          <Formik
            initialValues={{
              cedula: '',
              nombres: '',
              apellidos: '',
              telefono: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={(values) => {
              registerUser(values);
              if (!validar(values)) {
                setError(true);
              } else {
                alert('correcto');
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextImput
                  label="Cédula*"
                  icon="note"
                  placeholder="Ingrese su cédula"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange('cedula')}
                  onBlur={handleBlur('cedula')}
                  value={values.cedula}
                  keyboardType="numeric"
                />
                <MyTextImput
                  label="Nombres*"
                  icon="person"
                  placeholder="Ingrese sus nombres"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange('nombres')}
                  onBlur={handleBlur('nombres')}
                  value={values.nombres}
                  keyboardType="email-address"
                />
                <MyTextImput
                  label="Apellidos*"
                  icon="person"
                  placeholder="Ingrese sus apellidos"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange('apellidos')}
                  onBlur={handleBlur('apellidos')}
                  value={values.apellidos}
                  keyboardType="email-address"
                />
                <MyTextImput
                  label="Teléfono*"
                  icon="device-mobile"
                  placeholder="Ingrese su teléfono"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange('telefono')}
                  onBlur={handleBlur('telefono')}
                  value={values.telefono}
                  keyboardType="numeric"
                />
                <MyTextImput
                  label="Correo*"
                  icon="mail"
                  placeholder="usuario@gmail.com"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                <MyTextImput
                  label="Contraseña*"
                  icon="lock"
                  placeholder="* * * * * * * * * * * *"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MyTextImput
                  label="Confirmar Contraseña*"
                  icon="lock"
                  placeholder="* * * * * * * * * * * *"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={hideConfirmPassword}
                  isConfirmPassword={true}
                  hideConfirmPassword={hideConfirmPassword}
                  setHideConfirmPassword={setHideConfirmPassword}
                />
                {error && <MsgBox>Debe Completar todos los Campos Correctamente</MsgBox>}
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>
                    {loading ? <ActivityIndicator size="large" color={Colors.darklight} /> : 'Registrarse'}
                  </ButtonText>
                </StyledButton>
                <ExtraViewMargin style={{ marginBotton: 30 }}>
                  <ExtraText>¿Ya tienes cuenta? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('Login')}>
                    <TextLinkContent>Iniciar Sesión</TextLinkContent>
                  </TextLink>
                </ExtraViewMargin>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledScrollContainer>
    </StyledSafeArea>
  );
};

const MyTextImput = ({
  label,
  icon,
  isPassword,
  isConfirmPassword,
  hidePassword,
  setHidePassword,
  hideConfirmPassword,
  setHideConfirmPassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={Colors.greenPet} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isConfirmPassword && (
        <RightIcon onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
          <Ionicons name={hideConfirmPassword ? 'md-eye-off' : 'md-eye'} size={30} color={Colors.darklight} />
        </RightIcon>
      )}
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={Colors.darklight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Signup;
