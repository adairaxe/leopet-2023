import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Dialog from 'react-native-dialog';
import { Octicons } from '@expo/vector-icons';

import {
  StyledSafeArea,
  StyledScrollContainer,
  InnerContainer,
  PageTitle,
  Subtitle,
  StyledButton,
  StyledButtonMedio,
  StyledButtonMedioCancelar,
  ButtonText,
  TextInfo,
  Colors,
} from '../components/StyledComponents/styles';

const VentanaConfirmacion = ({ visible, titulo, icon, descripcion, cancelar, aceptar }) => {
  const opcionCancelar = () => {
    cancelar();
  };

  const opcionAceptar = () => {
    aceptar();
  };

  return (
    <View style={styles.container}>
      <Dialog.Container visible={visible}>
        <Dialog.Title style={{ color: Colors.greenPet, fontSize: 18, fontWeight: 'bold', letterSpacing: 1 }}>
          {titulo}
        </Dialog.Title>

        <Dialog.Description>{descripcion}</Dialog.Description>

        <Dialog.Button
          style={{
            borderRadius: 5,
            backgroundColor: Colors.pinkPet,
            color: Colors.primary,
            fontSize: 12,
            marginEnd: 10,
          }}
          label="Cancelar"
          onPress={opcionCancelar}
        />
        <Dialog.Button
          style={{ borderRadius: 5, backgroundColor: Colors.pinkPet, color: Colors.primary, fontSize: 12 }}
          label="Aceptar"
          onPress={opcionAceptar}
        />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default VentanaConfirmacion;
