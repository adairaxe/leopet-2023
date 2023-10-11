import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import CustomHeader from '../components/Headers/CustomHeader';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements';

// Icons
import { Octicons, Ionicons } from '@expo/vector-icons';

// Servicios
import { getManadas, deleteAllAnimalsManadaApp } from '../services/Manada';

// Cards
import CardManada from '../components/Cards/CardManada';

import {
  StyledSafeArea,
  InnerContainer,
  PageTitle,
  StyledScrollContainer,
  TextInfo,
  Colors,
} from '../components/StyledComponents/styles';
import { GLOBALCONFIG } from '../Config';

const HomeScreen = ({ navigation }) => {
  const { manifest } = Constants;
  const uri = GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort;

  const [manadas, setManadas] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadManadas(0, true);
    });
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

  const eliminarManada = async (id_manada) => {
    const jsonValue = await AsyncStorage.getItem('session');
    const data = await JSON.parse(jsonValue);
    return deleteAllAnimalsManadaApp(
      {
        manadaId: id_manada,
      },
      {
        apiUrl: uri,
        token: data.token,
      },
    )
      .then((data) => {
        alert('Manada Eliminada');
        loadManadas(0, true);
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
            navigation.navigate('Ver Manada', {
              manadaId: manada.id,
              monto: manada.monto,
              nombre: manada.nombre,
              galeriamanada: manada.galeriamanada,
              apadrinados: manada.apadrinados,
              prueba: 6,
            })
          }
        >
          <CardManada
            key={manada.id}
            nombre={manada.nombre}
            galeriamanada={manada.galeriamanada}
            monto={manada.monto}
            id_manada={manada.id}
            apadrinados={manada.apadrinados}
            navigation={navigation}
            isMenu="MANADAS"
            eliminarManada={eliminarManada}
          />
        </TouchableOpacity>
      );
    });
  };
  return (
    <StyledSafeArea>
      <CustomHeader isHome={true} isManada={true} title="Manadas" color={'white'} navigation={navigation} />
      <StyledScrollContainer>
        <InnerContainer>
          <StatusBar style="dark" />
          {/* <PageTitle>LEOPET</PageTitle>
          <TextInfo>Aqui puedes ver tus manadas y crear manadas</TextInfo> */}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Crear Manada', {
                isMenu: 'HOME',
                isEditar: false,
              })
            }
          >
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

          <Divider />
          {isLoading ? <ActivityIndicator size="large" color={Colors.darklight} /> : loadManada()}
          <View style={{ marginBottom: 30 }}></View>
        </InnerContainer>
      </StyledScrollContainer>
    </StyledSafeArea>
  );
};

export default HomeScreen;
