import React, {useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, TextInput, SafeAreaView, Image, TouchableOpacity, Modal} from 'react-native';
import {AgePicker} from './pickers/AgePicker';
import {GenderPicker} from './pickers/GenderPicker';

const BasicInputScreen = ({navigation}) => {
    console.log("BasicInfoInput rendered");

    const [chooseAge, setChooseAge] = useState('Select Age')
    const [chooseGender, setChooseGender] = useState('Select Gender')
    const [isAgeVisible, setIsAgeVisible] = useState(false)
    const [isGenderVisible, setIsGenderVisible] = useState(false)

    const changeAgeVisibility = (bool) => {
        setIsAgeVisible(bool)
    }

    const changeGenderVisibility = (bool) => {
        setIsGenderVisible(bool)
    }

    const navigateToAdvancedInfoInput = () => {
        console.log('Button pressed (BasicInfoInput -> AdvancedInfoInput)');
        navigation.navigate('AdvancedInfoInput');
    };

    const setAge = (option) => {
        console.log("User chose age: ");
        console.log(option);
        setChooseAge(option);
        // TODO link with back-end
    }

    const setGender = (option) => {
        console.log("User chose gender: ");
        console.log(option);
        setChooseGender(option);
        // TODO link with back-end
    }

    const handleNameTextChange = (text) => {
        console.log("User entered text for name: ");
        console.log(text);
        // TODO link with back-end
    }

    const handleEmailTextChange = (text) => {
        console.log("User entered text for email: ");
        console.log(text);
        // TODO link with back-end
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.infoText}>Before getting started, we'll{"\n"}need to know some basic information first.</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#666"
                onChangeText={handleNameTextChange}
            />

            <Text style={styles.infoText}>Your email is how we'll remember your information</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#666"
                onChangeText={handleEmailTextChange}
            />

            <Text style={styles.infoText}>Select your age (in years)</Text>
            <TouchableOpacity
                onPress={() => changeAgeVisibility(true)}
                style={styles.touchableOpacity}
            >
                <Text style={styles.optionText}>{chooseAge}</Text>

            </TouchableOpacity>

            {/*Controls the pop-up picker for age*/}
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

            <Text style={styles.infoText}>Select your sex</Text>
            <TouchableOpacity
                onPress={() => changeGenderVisibility(true)}
                style={styles.touchableOpacity}
            >
                <Text style={styles.optionText}>{chooseGender}</Text>

            </TouchableOpacity>

            {/*Controls the pop-up picker for gender*/}
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

            {/*Button to navigate to the next page*/}
            <Text></Text>
            <TouchableOpacity style={styles.button} onPress={navigateToAdvancedInfoInput}>
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
        marginBottom: 10,
        fontSize: 25,
        fontWeight: 'bold',
    },
    optionText: {
        color: '#000000',
        textAlign: 'center',
        marginBottom: 0,
        fontSize: 20,
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
    touchableOpacity: {
        borderRadius: 25,
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
});

export default BasicInputScreen;