import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';

const WelcomeScreen = ({navigation}) => {
    console.log("WelcomeScreen rendered");

    const handlePress = () => {
        console.log('Button pressed (WelcomeScreen -> BasicInfoInput)');
        navigation.navigate('BasicInfoInput');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={[styles.centeredWhiteText, styles.titleSize]}>DietPow!</Text>
            <Text style={[styles.centeredWhiteText, styles.normalSize]}>
                Your companion app{"\n"}for your dietary needs{"\n"}and health goals!{"\n"}
            </Text>
            <Image source={require('../assets/DietPowEmblem.png')} style={styles.logo}/>
            <StatusBar style="auto"/>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
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
    centeredWhiteText: {
        color: 'white',
        textAlign: 'center',
    },
    normalSize: {
        fontSize: 25,
    },
    titleSize: {
        fontSize: 70,
        fontWeight: 'bold',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#FF7300',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;