import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, TouchableOpacity, Text, Modal } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements';

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
import { GLOBALCONFIG } from '../Config';

const AddAnimal = ({ route, navigation }) => {
  const { animalId, nombre, descripcion, imagen, fundacion, raza, especie, galeria } = route.params;
  const { manifest } = Constants;
  const uri = GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort;

  const [manadas, setManadas] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadManadas(0, true);
      console.log('Refreshed!');
    });
    return unsubscribe;
  }, []);

  const loadManadas = async (page, reset, cb) => {
    const jsonValue = await AsyncStorage.getItem('session');
    const data = await JSON.parse(jsonValue);
    if (reset) {
      setLoading(true);
    }
    return getManadas(
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
        setManadas(reset ? data : [...manadas, ...data]);
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

  const loadManada = () => {
    return manadas.map((manada) => {
      return (
        <TouchableOpacity
          key={manada.id}
          onPress={() =>
            navigation.navigate('Confirmar', {
              animalId,
              nombre,
              descripcion,
              imagen,
              fundacion,
              manadaId: manada.id,
              raza,
              especie,
              galeria,
            })
          }
        >
          <CardManada
            isAgregar={true}
            key={manada.id}
            nombre={manada.nombre}
            monto={manada.monto}
            id_manada={manada.id}
            navigation={navigation}
            isMenu="HOME"
            animalId={animalId}
            nombreAnimal={nombre}
            descripcion={descripcion}
            imagen={imagen}
            fundacion={fundacion}
            raza={raza}
            especie={especie}
            galeriamanada={manada.galeriamanada}
            apadrinados={manada.apadrinados}
            galeria={galeria}
          />
        </TouchableOpacity>
      );
    });
  };

  const [isVisible, setIsVisible] = useState(false);

  return (
    <StyledSafeArea>
      <CustomHeader title="Agregar Animal" color={Colors.greenPet} navigation={navigation} />
      <StyledScrollContainer>
        <InnerContainer>
          <StatusBar style="dark" />
          <PageTitle>Mis manadas</PageTitle>
          {/*  <Subtitle>Tus manadas</Subtitle> */}
          <Text style={{ color: Colors.black, fontSize: 18, margin: 20, fontWeight: 'bold' }}>
            Puedes agregar a {nombre} a alguna de tus manadas manadas
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Crear Manada', {
                isMenu: 'HOME',
                isEditar: false,
              })
            }
          >
            {/*   <TouchableOpacity onPress={() => setIsVisible(true)}> */}
            <Card
              containerStyle={{
                width: 370,
                height: 180,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name="add-circle"
                justifyContent="center"
                alignItems="center"
                size={130}
                color={Colors.pinkPet}
              />
              <Text
                style={{ color: Colors.greenPet, fontSize: 18, margin: -10, fontWeight: 'bold', textAlign: 'center' }}
              >
                Crear manada
              </Text>
            </Card>
          </TouchableOpacity>

          {isLoading ? <ActivityIndicator size="large" color={Colors.darklight} /> : loadManada()}
          <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: Colors.beige }}></View>
          <View style={{ marginBottom: 30 }}></View>
        </InnerContainer>
      </StyledScrollContainer>

      <Modal animationType="fade" visible={isVisible} transparent={true}>
        {/* Background */}

        <View
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></View>

        {/* Contenido del modal */}
        <View>
          <Text>Modal</Text>
          <Text>cuerpo del modal</Text>
          <StyledButtonMedio onPress={() => setIsVisible(false)}>Aceptar</StyledButtonMedio>
        </View>
      </Modal>
    </StyledSafeArea>
  );
};

export default AddAnimal;
