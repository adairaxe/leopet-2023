import React, { useState } from 'react';
import { Button, Modal, Text, View } from 'react-native';
import { StyledButtonMedio } from '../components/StyledComponents/styles';

export const ModalApadrinarScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
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
  );
};

export default ModalApadrinarScreen;
