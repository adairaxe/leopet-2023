import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';

//Formik
import { Formik } from 'formik';

// Header
import CustomHeader from '../components/Headers/CustomHeader';
// Icons
import { Octicons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  TextInfo,
  Colors,
} from '../components/StyledComponents/styles';

/* const getUsuario = async () => {
  const jsonValue = await AsyncStorage.getItem('session');
  const data = await JSON.parse(jsonValue);
  //console.log(data);
  return (data);
 
};
 */

const Perfil = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  /* const [usuario, setUsuario] = useState(getUsuario);
  console.log(usuario); */

  return (
    <StyledSafeArea>
      <CustomHeader isHome={true} title="Perfil" color={'white'} navigation={navigation} />
      <StyledScrollContainer>
        <InnerContainer>
          <StatusBar style="dark" />
          {/*  <PageTitle>LEOPET</PageTitle>
          <Subtitle>Tu Perfil</Subtitle>
          <TextInfo>Aqui puedes editar tus datos</TextInfo>    */}
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
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextImput
                  label="Cédula*"
                  icon="note"
                  placeholder="0909090909"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange('cedula')}
                  onBlur={handleBlur('cedula')}
                  value={values.cedula}
                  keyboardType="email-address"
                />
                <MyTextImput
                  label="Nombres*"
                  icon="person"
                  placeholder="Johanna"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange('nombres')}
                  onBlur={handleBlur('nombres')}
                  value={values.nombres}
                  keyboardType="email-address"
                />
                <MyTextImput
                  label="Apellidos*"
                  icon="person"
                  placeholder="López"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange('apellidos')}
                  onBlur={handleBlur('apellidos')}
                  value={values.apellidos}
                  keyboardType="email-address"
                />
                <MyTextImput
                  label="Teléfono*"
                  icon="device-mobile"
                  placeholder="0909090909"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange('telefono')}
                  onBlur={handleBlur('telefono')}
                  value={values.telefono}
                  keyboardType="email-address"
                />
                <MyTextImput
                  label="Correo*"
                  icon="mail"
                  placeholder="donador@gmail.com"
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

                <ExtraViewMargin>
                  <StyledButtonMedio onPress={handleSubmit}>
                    <ButtonText>
                      {loading ? <ActivityIndicator size="large" color={Colors.darklight} /> : 'Actualizar Datos'}
                    </ButtonText>
                  </StyledButtonMedio>
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

export default Perfil;
