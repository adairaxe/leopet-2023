import React, { useState } from 'react';
import { Text, Card } from 'react-native-elements';
import { View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { Colors } from '../StyledComponents/styles';
import { ViewNombreLarge, View80 } from '../StyledComponents/styles';
import LogoLeopet from '../../assets/img/logo.png';

const CardFundacion = (props) => {
  const [like, setLike] = useState(false);
  const { id, nombre, direccion, logo, telefono, email } = props;

  return (
    <Card containerStyle={{ width: '80%', borderRadius: 15, elevation: 8, paddingTop: 10 }}>
      {/*        
      <View style={{flexDirection:'column', paddingBottom:2}}>
        <Card.Title style={{ textAlign:'left',fontSize: 20, justifyContent: 'center', alignItems:'center', marginLeft:8, marginBottom:2, marginTop:0}}>
          <Ionicons name="paw" size={20} color={Colors.greenPet}  />            
          <Text style={{ fontWeight: 'bold', marginTop:10, color:Colors.greenPet}}> {nombre}</Text>
        </Card.Title>
      </View> */}

      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {!logo ? (
            <View>
              <ActivityIndicator size="large" color={Colors.darklight} />
              <Text style={{ textAlign: 'center' }}>Cargando Imagen...</Text>
            </View>
          ) : id == 3 ? (
            <Card.Image
              style={{ padding: 0, margin: 2, width: 80, height: 80, overflow: 'hidden', borderRadius: 100 }}
              source={require('../../assets/img/logo.png')}
            />
          ) : (
            <Card.Image
              style={{ padding: 0, margin: 2, width: 80, height: 80, overflow: 'hidden', borderRadius: 100 }}
              source={{ uri: logo }}
            />
          )}

          <Card.Divider />

          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', paddingBottom: 2 }}>
              <Card.Title
                style={{
                  textAlign: 'left',
                  fontSize: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 8,
                  marginBottom: 10,
                  marginTop: 0,
                }}
              >
                <Ionicons name="paw" size={20} color={Colors.greenPet} />
                <Text style={{ fontWeight: 'bold', marginTop: 10, color: Colors.greenPet }}> {nombre}</Text>
              </Card.Title>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.etiqueta}>Teléfono: </Text>
              <Text style={styles.valor}>{telefono}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.etiqueta}>Email: </Text>
              <View80>
                <Text style={styles.valor}>{email}</Text>
              </View80>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.etiqueta}>Dirección: </Text>
            </View>

            <ViewNombreLarge>
              <Octicons name={'location'} size={15} color={Colors.greenPet} marginLeft={15} />
              <Text style={styles.valor}> {direccion}</Text>
            </ViewNombreLarge>

            {/* <View>
              <TouchableOpacity onPress={() => setLike(!like)}>
                {!like ? (
                  <Ionicons name="heart-outline" size={30} color="red" style={{ left: 120 }} />
                ) : (
                  <Ionicons name="heart" size={30} color="red" style={{ left: 120 }} />
                )}
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
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
    marginBottom: 5,
    fontWeight: 'bold',
  },

  valor: {
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 2,
    marginBottom: 5,
  },
});

export default CardFundacion;
