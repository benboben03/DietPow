import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, SafeAreaView, Image, TouchableOpacity, View, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {AgePicker} from './pickers/AgePicker';

const BasicInputScreen = ({ navigation }) => {
    console.log("BasicInfoInput rendered");

    const [chooseAge, setchooseAge] = useState('Select Age...')
    const [isModalVisible, setisModalVisible] = useState(false)

    const changeModalVisibility = (bool) => {
      setisModalVisible(bool)
    }

    const handlePress = () => {
        console.log('Button pressed (BasicInfoInput -> AdvancedInfoInput)');
        navigation.navigate('AdvancedInfoInput');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/BasicInfoPhoto.png')} style={styles.logo} />
            <Text style={styles.infoText}>Before getting started, we'll need to know some basic information first.</Text>
            <TextInput style={styles.input} placeholder="Enter your name" placeholderTextColor="#666" />
            
            <TouchableOpacity
              onPress={() => changeModalVisibility(true)}
              style={styles.touchableOpacity}
            >
              <Text style={styles.text}>{chooseAge}</Text>

            </TouchableOpacity>

            <Modal
              transparent={true}
              animationType='fade'
              visible={isModalVisible}
              nRequestClose={() => changeModalVisibility(false)}
            >
              <ModalPicker
                changeModalVisibility={changeModalVisibility}
              />

            </Modal>

            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#11BCF5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backgroundImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    infoText: {
      color: '#FFF',
      textAlign: 'center',
      marginBottom: 20,
      fontSize: 21,
    },
    input: {
      backgroundColor: '#FFF',
      borderRadius: 20,
      width: '80%',
      padding: 15,
      marginBottom: 10,
      fontSize: 18,
      color: '#333',
    },
    button: {
      backgroundColor: '#FF7300',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 30,
      marginBottom: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default BasicInputScreen;