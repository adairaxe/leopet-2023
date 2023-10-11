import React, { useEffect, useState } from 'react';
import { Text, Card } from 'react-native-elements';
import { View, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Modal } from 'react-native';
import { Colors } from '../StyledComponents/styles';
import { Ionicons, Octicons } from '@expo/vector-icons';
import Dialog from 'react-native-dialog';
import VentanaConfirmacion from '../../screens/VentanaConfirmacion';

const CardManada = ({
  nombre,
  monto,
  galeriamanada,
  id_manada,
  apadrinados,
  navigation,
  isMenu,
  eliminarManada,
  galeria,
}) => {
  const [visible, setVisible] = useState(false);

  const mostarVentanaConfirmacion = () => {
    setVisible(true);
  };

  const cancelarEliminacion = () => {
    setVisible(false);
  };

  const aceptarEliminacion = () => {
    setVisible(false);
    eliminarManada(id_manada);
  };

  return (
    <Card containerStyle={{ width: '100%', height: 180, borderRadius: 15, elevation: 8, justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', paddingBottom: 2, justifyContent: 'flex-start' }}>
        <View style={{ flex: 2, flexDirection: 'column' }}>
          <Card.Title
            style={{
              textAlign: 'left',
              fontSize: 25,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 8,
              marginBottom: 2,
              marginTop: 0,
            }}
          >
            <Ionicons name="paw" size={25} color={Colors.greenPet} />
            <Text style={{ fontWeight: 'bold', color: Colors.greenPet }}> {nombre}</Text>
          </Card.Title>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Crear Manada', {
              isMenu,
              isEditar: true,
              id_manada: id_manada,
              nombre: nombre,
              monto: monto,
            })
          }
        >
          <View style={{ flexDirection: 'column', marginRight: 10 }}>
            <Octicons name="pencil" size={20} color={Colors.greenPet} />
          </View>
        </TouchableOpacity>
        {isMenu == 'MANADAS' && (
          <TouchableOpacity onPress={mostarVentanaConfirmacion}>
            <View style={{ flexDirection: 'column' }}>
              <Octicons name="x" size={25} color={Colors.greenPet} />
            </View>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>
          {galeriamanada == null ? (
            <Card.Image
              style={{ padding: 0, margin: 2, width: 150, height: 120, overflow: 'hidden', borderRadius: 15 }}
              source={{
                uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.zcvfNF0y_P8UOLcYr-u43AHaFj%26pid%3DApi&f=1',
              }}
            />
          ) : (
            <Card.Image
              style={{ padding: 0, margin: 2, width: 150, height: 120, overflow: 'hidden', borderRadius: 15 }}
              source={{
                uri: galeriamanada.fotos[0],
              }}
            />
          )}
          <Card.Divider />
          <View style={{ marginTop: 10 }}>
            {/* <View style={{ flexDirection: 'row', paddingBottom: 2 }}>
              <Card.Title
                style={{
                  textAlign: 'left',
                  fontSize: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 8,
                  marginBottom: 10,
                }}
              >
                <Ionicons name="paw" size={20} color={Colors.greenPet} />
                <Text style={{ fontWeight: 'bold', color: Colors.greenPet }}> {nombre}</Text>
              </Card.Title>
            </View> */}

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.etiqueta}>Monto: </Text>
              <Text style={styles.valor}>$ {monto}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.etiqueta}>Animales: </Text>
              <Text style={styles.valor}>{apadrinados}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.etiqueta}>Suscripcion: </Text>
              <Text style={styles.valor}>$ {monto * apadrinados}</Text>
            </View>
          </View>
        </View>
      </View>
      <VentanaConfirmacion
        visible={visible}
        titulo="Eliminar Manada"
        icon="question"
        descripcion="¿Está seguro de que desea eliminar la manada con todos sus animales?"
        cancelar={cancelarEliminacion}
        aceptar={aceptarEliminacion}
      ></VentanaConfirmacion>
      <View style={styles.container}>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Eliminar Manada</Dialog.Title>
          <Dialog.Description>Desea Eliminar la manada con todos sus animales.</Dialog.Description>
          <Dialog.Button label="Cancelar" onPress={cancelarEliminacion} />
          <Dialog.Button label="Aceptar" onPress={aceptarEliminacion} />
        </Dialog.Container>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  etiqueta: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: Colors.black,
    textAlign: 'left',
    marginLeft: 8,
    marginBottom: 2,
    fontWeight: 'bold',
  },

  valor: {
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 2,
    marginBottom: 2,
  },
  subtitulo: {
    fontSize: 18,
    marginBottom: 10,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colors.greenPet,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CardManada;
