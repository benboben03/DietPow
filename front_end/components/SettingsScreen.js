import {StyleSheet, Text, SafeAreaView, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from "react";

const SettingsScreen = () => {
    console.log("SettingsScreen rendered");

    const [newGoal, setNewGoal] = useState("")
    const handleGoalTextChange = (text) => {
        console.log("User entered text for new goal: ");
        console.log(text);
        setNewGoal(text);
    }
    const handleGoalButtonPress = () => {
        console.log("User updated goal with: ");
        console.log(newGoal);
        // TODO link with back-end
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.titleText}>Settings</Text>
            </View>
            <View style={styles.bottomSection}>
                <View style={styles.blueBackdrop}>
                    <Text style={styles.settingsText}>Change your goal weight</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new goal weight"
                            placeholderTextColor="#666"
                            onChangeText={handleGoalTextChange}
                        />
                        <TouchableOpacity
                            onPress={handleGoalButtonPress}
                            style={styles.touchableOpacity}
                        >
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#11BCF5'
    },
    topSection: {
        backgroundColor: '#11BCF5',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20
    },
    bottomSection: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10
    },
    titleText: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold'
    },
    settingsText: {
        fontSize: 25,
        color: 'white',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    blueBackdrop: {
        backgroundColor: '#0A9BCB',
        flex: 1,
        width: '100%',
        borderRadius: 10,
        padding: 16
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        width: '60%',
        padding: 10,
        marginRight: 10,
        fontSize: 15,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    touchableOpacity: {
        borderRadius: 25,
        backgroundColor: '#FF7300',
        paddingVertical: 13,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 15
    }
})

export default SettingsScreen;