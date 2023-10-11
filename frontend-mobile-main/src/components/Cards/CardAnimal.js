import React, { useState } from 'react';
import { Text, Card, Icon } from 'react-native-elements';
import { View, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Ionicon, Octicons } from '@expo/vector-icons';
import { Colors } from '../StyledComponents/styles';
import { ViewNombreLarge } from '../StyledComponents/styles';
import VentanaConfirmacion from '../../screens/VentanaConfirmacion';

const Animales = (props) => {
  const [like, setLike] = useState(false);
  const [visible, setVisible] = useState(false);

  const {
    id,
    nombre,
    descripcion,
    imagen,
    fundacion,
    raza,
    especie,
    fundacion_id,
    edad,
    peso,
    esterilizacion,
    vacunacion,
    desparasitacion,
    enfermedades,
    fecha_rescate,
    fecha_registro,
    sexo,
    isMenuManada,
    eliminarAnimalManada,
    galeria,
  } = props;

  const iconoEspecie = () => {
    let DEFAULT_IMAGE = { image: require('../../assets/icons/paw.png') };
    switch (especie) {
      case 'Perro':
        DEFAULT_IMAGE.image = require('../../assets/icons/dog.png');
        return DEFAULT_IMAGE.image;
      case 'Gato':
        DEFAULT_IMAGE.image = require('../../assets/icons/cat.png');
        return DEFAULT_IMAGE.image;
      default:
        DEFAULT_IMAGE.image = require('../../assets/icons/paw.png');
        return DEFAULT_IMAGE.image;
    }
  };

  const mostarVentanaConfirmacion = () => {
    setVisible(true);
  };

  const cancelarEliminacion = () => {
    setVisible(false);
  };

  const aceptarEliminacion = () => {
    setVisible(false);
    eliminarAnimalManada(id);
  };

  return (
    <Card containerStyle={{ height: 180, borderRadius: 15, elevation: 8, justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', paddingBottom: 2, justifyContent: 'flex-end' }}>
        {/* <View style={{flex:2, flexDirection:'column'}}>
          <Card.Title style={{ textAlign:'left',fontSize: 25, justifyContent: 'center', alignItems:'center', marginLeft:8, marginBottom:2, marginTop:0}}> 
            <Ionicons name={iconoEspecie()} size={25} color={Colors.greenPet}/> 
            <Image source={iconoEspecie()} style={{width:25, height:25}} ></Image>
            <Text style={{ fontWeight: 'bold', color:Colors.greenPet}}> {nombre}</Text> 
            <Image
              source={require('../../assets/icons/leohuella.png') }
              style={styles.imagen}>
            </Image>     
           </Card.Title>
        </View> */}

        {isMenuManada && (
          <TouchableOpacity onPress={mostarVentanaConfirmacion}>
            <View style={{ flexDirection: 'column', padding: 3 }}>
              <Octicons name="x" size={25} color={Colors.greenPet} />
            </View>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>
          {!imagen ? (
            <View>
              <ActivityIndicator size="large" color={Colors.darklight} />
              <Text style={{ textAlign: 'center' }}>Cargando Imagen...</Text>
            </View>
          ) : galeria == null ? (
            <Card.Image
              style={{ padding: 0, margin: 2, width: 180, height: 120, overflow: 'hidden', borderRadius: 15 }}
              source={{
                uri: '',
              }}
            />
          ) : (
            <Card.Image
              style={{ padding: 0, margin: 2, width: 180, height: 120, overflow: 'hidden', borderRadius: 15 }}
              source={{
                uri: galeria.fotos[0],
              }}
            />
          )}

          <Card.Divider />

          <View style={{ marginTop: 0 }}>
            <View style={{ flexDirection: 'row' }}>
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
                <Image source={iconoEspecie()} style={{ width: 25, height: 25 }}></Image>
                <Text style={{ fontWeight: 'bold', color: Colors.greenPet }}> {nombre}</Text>
              </Card.Title>
              {/*  {isMenuManada &&(
              <TouchableOpacity
                onPress={mostarVentanaConfirmacion}
              >
                <View style={{ flexDirection: 'column', padding: 3 }}>
                  <Octicons name="x" size={25} color={Colors.greenPet} />
                </View>
              </TouchableOpacity>
            )} */}
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.etiqueta}>Especie: </Text>
              <Text style={styles.valor}>{especie}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.etiqueta}>Raza: </Text>
              <Text style={styles.valor}>{raza}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.etiqueta}>Fundación: </Text>
            </View>

            <ViewNombreLarge>
              <Text style={styles.valor}>{fundacion}</Text>
            </ViewNombreLarge>

            {fundacion_id == 3 && (
              <View style={{ flexDirection: 'row', position: 'absolute', top: 80, right: 98 }}>
                <Image source={require('../../assets/icons/leohuella1.png')} style={styles.imagen}></Image>
              </View>
            )}
          </View>
        </View>
      </View>

      <VentanaConfirmacion
        visible={visible}
        titulo="Eliminar Animal de la Manada"
        descripcion="¿Está seguro de que desea eliminar el animal?"
        cancelar={cancelarEliminacion}
        aceptar={aceptarEliminacion}
      ></VentanaConfirmacion>
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
  imagen: {
    width: 46,
    height: 46,
    borderRadius: 100,
    marginLeft: 115,
  },

  viewSocialMedia: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});

export default Animales;
