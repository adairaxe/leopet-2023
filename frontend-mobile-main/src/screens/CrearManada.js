import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Formik para el Formulario
import { Formik } from 'formik';

// Services
import { createManada, actualizarManada } from '../services/Manada';

// Header
import CustomHeader from '../components/Headers/CustomHeader';
// Icons
import { Ionicons } from '@expo/vector-icons';

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

const CrearManada = ({ route, navigation }) => {
  const {
    isMenu,
    isEditar,
    id_manada,
    nombre,
    monto,
    animalId,
    nombreAnimal,
    descripcion,
    imagen,
    fundacion,
    raza,
    especie,
  } = route.params;
  const { manifest } = Constants;

  const uri = GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort;
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState();

  const createNewManada = async (manada) => {
    const jsonValue = await AsyncStorage.getItem('session');
    const data = await JSON.parse(jsonValue);
    setLoading(true);

    if (isEditar) {
      manada.id = id_manada;
      return actualizarManada(manada, {
        apiUrl: uri,
        token: data.token,
      })
        .then(() => {
          setLoading(false);
          console.log(isMenu);
          if (isMenu == 'HOME') navigation.goBack();
          if (isMenu == 'MANADAS') navigation.push('Manadas');
        })
        .catch((err) => {
          console.log(err);
          setError(err?.message || 'Server Error');
          setLoading(false);
        });
    } else {
      return createManada(manada, {
        apiUrl: uri,
        token: data.token,
      })
        .then(() => {
          setLoading(false);
          console.log(isMenu);
          if (isMenu == 'HOME') navigation.goBack();
          if (isMenu == 'MANADAS') navigation.push('Manadas');
        })
        .catch((err) => {
          console.log(err);
          setError(err?.message || 'Server Error');
          setLoading(false);
        });
    }
  };

  const validarCampos = (values) => {
    console.log(values);
    if (values.nombre == null) {
      alert('Falta Nombre de manada');
      return false;
    }
    if (values.monto == null) {
      alert('Falta monto');
      return false;
    }
    if (values.nombre.length <= 0) {
      alert('Falta Nombre de manada');
      return false;
    }
    if (values.monto.length <= 0) {
      alert('Falta monto');
      return false;
    }
    if (isNaN(values.monto)) {
      alert('Monto tiene que ser número');
      return false;
    }
    if (values.monto < 5) {
      alert('Monto mínimo $5');
      return false;
    }
    return true;
  };

  return (
    <StyledSafeArea>
      <CustomHeader
        isHome={false}
        title={(isEditar ? 'Editar ' : 'Crear ') + 'Manada'}
        color={Colors.greenPet}
        navigation={navigation}
      />
      <StyledScrollContainer>
        <InnerContainer>
          <StatusBar style="dark" />
          {/*   <PageTitle>LEOPET</PageTitle>
          <Subtitle>{isEditar?"Editar ":"Crear "}una manada</Subtitle> */}
          <TextInfo style={{ marginBottom: 30 }}>
            Aqui puedes {isEditar ? 'Editar ' : 'Crear '} una manada llenando el formulario
          </TextInfo>
          <Formik
            initialValues={{
              nombre: nombre,
              monto: monto,
            }}
            onSubmit={(values) => {
              if (validarCampos(values)) {
                createNewManada(values);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextImput
                  label={'Nombre de la Manada*'}
                  icon="paw"
                  placeholder="Ingrese nombre de manada"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange('nombre')}
                  onBlur={handleBlur('nombre')}
                  value={values.nombre}
                />
                <MyTextImput
                  label="Monto*"
                  icon="cash"
                  placeholder="Ingrese monto de donación"
                  placeholderTextColor={Colors.darklight}
                  onChangeText={handleChange('monto')}
                  onBlur={handleBlur('monto')}
                  value={values.monto}
                  keyboardType="numeric"
                />

                {error && <MsgBox>Debe completar todos los campos correctamente</MsgBox>}

                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <StyledButtonMedio onPress={handleSubmit}>
                    <ButtonText>
                      {isLoading ? (
                        <ActivityIndicator size="large" color={Colors.darklight} />
                      ) : (
                        (isEditar ? 'Actualizar ' : 'Crear ') + 'Manada'
                      )}
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
        <Ionicons name={icon} size={30} color={Colors.greenPet} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
    </View>
  );
};

export default CrearManada;
