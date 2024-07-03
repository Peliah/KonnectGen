import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CongratulationsPopup = ({ visible, onClose }) => {
    const niceImage = require('./../../assets/images/Product-quality-pana.png');
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      backdropOpacity={10}
      onRequestClose={onClose}
      onBackdropPress={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Congratulations!</Text>
          <Image source={niceImage} style={{ width: 250, height: 250 }} />
          <Text>You are successfully registered.</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    color: 'blue',
  },
});

export default CongratulationsPopup;
