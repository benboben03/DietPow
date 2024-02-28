import React, {useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, TextInput, SafeAreaView, Image, TouchableOpacity, Modal} from 'react-native';
import {AgePicker} from './pickers/AgePicker';
import {GenderPicker} from './pickers/GenderPicker';

const BasicInputScreen = ({navigation}) => {
    console.log("BasicInfoInput rendered");

    const [chooseAge, setchooseAge] = useState('Select Age')
    const [chooseGender, setchooseGender] = useState('Select Gender')
    const [isAgeVisible, setisAgeVisible] = useState(false)
    const [isGenderVisible, setisGenderVisible] = useState(false)

    const changeAgeVisibility = (bool) => {
        setisAgeVisible(bool)
    }

    const changeGenderVisibility = (bool) => {
        setisGenderVisible(bool)
    }

    const handlePress = () => {
        console.log('Button pressed (BasicInfoInput -> AdvancedInfoInput)');
        navigation.navigate('AdvancedInfoInput');
    };

    const setAge = (option) => {
        setchooseAge(option);
    }

    const setGender = (option) => {
        setchooseGender(option);
    }

    const handleNameTextChange = (text) => {
        console.log("User entered text for name: ");
        console.log(text);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/BasicInfoPhoto.png')} style={styles.logo}/>
            <Text style={styles.infoText}>Before getting started, we'll need to know some basic information
                first.</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#666"
                onChangeText={handleNameTextChange}
            />

            <Text style={styles.infoText}>Select your age (in years)</Text>
            <TouchableOpacity
                onPress={() => changeAgeVisibility(true)}
                style={styles.touchableOpacity}
            >
                <Text style={styles.text}>{chooseAge}</Text>

            </TouchableOpacity>

            <Modal
                transparent={true}
                animationType='fade'
                visible={isAgeVisible}
                nRequestClose={() => changeAgeVisibility(false)}
            >
                <AgePicker
                    changeModalVisibility={changeAgeVisibility}
                    setData={setAge}
                />

            </Modal>

            <Text style={styles.infoText}>{"\n"}Select your sex</Text>
            <TouchableOpacity
                onPress={() => changeGenderVisibility(true)}
            >
                <Text style={styles.text}>{chooseGender}</Text>

            </TouchableOpacity>

            <Modal
                transparent={true}
                animationType='fade'
                visible={isGenderVisible}
                nRequestClose={() => changeGenderVisibility(false)}
            >

                <GenderPicker
                    changeModalVisibility={changeGenderVisibility}
                    setData={setGender}
                />

            </Modal>

            <Text style={styles.infoText}></Text>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

            <StatusBar style="auto"/>
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