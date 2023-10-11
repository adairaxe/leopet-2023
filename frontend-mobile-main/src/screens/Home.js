import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../components/Headers/CustomHeader';
import Constants from 'expo-constants';
import Animales from '../components/Cards/CardAnimal';
import { ActivityIndicator, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';

// Servicios
import { getAnimalsApp } from '../services/Animals';

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
  ViewFiltro,
  ViewFiltroButton,
} from '../components/StyledComponents/styles';
import styled from 'styled-components';
import { GLOBALCONFIG } from '../Config';

const Welcome = ({ navigation }) => {
  const { manifest } = Constants;
  const uri = GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort;

  // Varibles
  const [animals, setAnimals] = useState([]);
  const [isLoading, setLoading] = useState();
  const [especieAnimal, setEspecieAnimal] = useState(null);
  const [tipoAnimal, setTipoAnimal] = useState('TODOS');

  const [error, setError] = useState();

  // Cargar animales al renderizar el componente
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadAnimals(0, true, null, 'TODOS');
    });
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('session');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  const loadAnimals = async (page, reset, cb, especie) => {
    const jsonValue = await AsyncStorage.getItem('session');
    const data = await JSON.parse(jsonValue);
    if (reset) {
      setLoading(true);
    }
    return getAnimalsApp(
      {
        q: null,
        page,
        limit: 20,
        tipoAnimal: especie,
      },
      {
        apiUrl: uri,
        token: data.token,
      },
    )
      .then((data) => {
        setAnimals(reset ? data : [...animals, ...data]);
        if (reset) {
          setLoading(false);
        }
        if (cb) {
          cb(data.length != 0);
        }
      })
      .catch((err) => {
        console.log('datos');
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };
  const loadAnimal = (navigation) => {
    return animals.map((animal) => {
      return (
        <TouchableOpacity
          key={animal.id}
          onPress={() =>
            navigation.navigate('Detalle de Animal', {
              animalId: animal.id,
              nombre: animal.nombre,
              descripcion: animal.descripcion,
              imagen: animal.imagen,
              fundacion: animal.fundacion,
              raza: animal.raza,
              especie: animal.especie,
              fundacion_id: animal.fundacion_id,
              edad: animal.edad,
              peso: animal.peso,
              esterilizacion: animal.esterilizacion,
              vacunacion: animal.vacunacion,
              desparasitacion: animal.desparasitacion,
              enfermedades: animal.enfermedades,
              fecha_rescate: animal.fecha_rescate,
              fecha_registro: animal.fecha_registro,
              sexo: animal.sexo,
              galeria: animal.galeria,
            })
          }
        >
          <Animales
            id={animal.id}
            nombre={animal.nombre}
            descripcion={animal.descripcion}
            imagen={animal.imagen}
            fundacion={animal.fundacion}
            navigation={navigation}
            raza={animal.raza}
            especie={animal.especie}
            fundacion_id={animal.fundacion_id}
            isMenuManada={false}
            edad={animal.edad}
            peso={animal.peso}
            esterilizacion={animal.esterilizacion}
            vacunacion={animal.vacunacion}
            desparasitacion={animal.desparasitacion}
            enfermedades={animal.enfermedades}
            fecha_rescate={animal.fecha_rescate}
            fecha_registro={animal.fecha_registro}
            sexo={animal.sexo}
            galeria={animal.galeria}
          />
        </TouchableOpacity>
      );
    });
  };

  function cargarTodos() {
    setTipoAnimal('TODOS');
    loadAnimals(0, true, null, 'TODOS');
  }
  function cargarPerros() {
    setTipoAnimal('Perro');
    loadAnimals(0, true, null, 'Perro');
  }

  function cargarGatos() {
    setTipoAnimal('Gato');
    loadAnimals(0, true, null, 'Gato');
  }

  return (
    <StyledSafeArea>
      <CustomHeader isHome={true} title="Animales" color={Colors.primary} navigation={navigation} />
      <ViewFiltro>
        <ViewFiltroButton>
          <TouchableOpacity
            style={tipoAnimal == 'TODOS' ? styles.filtroButtonPresionado : styles.filtroButton}
            onPress={cargarTodos}
          >
            <Text style={tipoAnimal == 'TODOS' ? styles.filtroTextButtonPresionado : styles.filtroTextButton}>
              TODOS
            </Text>
          </TouchableOpacity>
        </ViewFiltroButton>
        <ViewFiltroButton>
          <TouchableOpacity
            style={tipoAnimal == 'Perro' ? styles.filtroButtonPresionado : styles.filtroButton}
            onPress={cargarPerros}
          >
            <Text style={tipoAnimal == 'Perro' ? styles.filtroTextButtonPresionado : styles.filtroTextButton}>
              PERROS
            </Text>
          </TouchableOpacity>
        </ViewFiltroButton>
        <ViewFiltroButton>
          <TouchableOpacity
            style={tipoAnimal == 'Gato' ? styles.filtroButtonPresionado : styles.filtroButton}
            onPress={cargarGatos}
          >
            <Text style={tipoAnimal == 'Gato' ? styles.filtroTextButtonPresionado : styles.filtroTextButton}>
              GATOS
            </Text>
          </TouchableOpacity>
        </ViewFiltroButton>
      </ViewFiltro>
      <StyledScrollContainer>
        <InnerContainer>
          <StatusBar style="dark" />
          {/* <PageTitle>LEOPET</PageTitle>
          <TextInfo>En esta sección encontrarás a los animales que están registrados por diversas Fundaciones</TextInfo> */}

          <Divider />
          {isLoading ? <ActivityIndicator size="large" color={Colors.darklight} /> : loadAnimal(navigation)}
          {/* {isTipoAnimal ? <ActivityIndicator size="large" color={Colors.darklight} /> : loadTipoAnimal(navigation,especieAnimal)} */}
          {/*  <StyledButtonMedio onPress={logout}>
            <ButtonText>Logout</ButtonText>
          </StyledButtonMedio> */}
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
  filtroButtonPresionado: {
    backgroundColor: Colors.pinkLow,
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

  filtroTextButtonPresionado: {
    fontWeight: 'bold',
    color: '#606264',
    fontSize: 16,
  },
});

export default Welcome;
