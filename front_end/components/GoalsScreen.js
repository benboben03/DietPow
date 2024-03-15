import {StyleSheet, Text, SafeAreaView, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from "react";
import { useSelector } from 'react-redux';

const GoalsScreen = () => {

    const [goalWeight, setGoalWeight] = useState(0.0);
    const [goalTime, setGoalTime] = useState(0);
    const userEmail = useSelector(state => state.userEmail);
    // TODO get goal weight from back-end
    // TODO get goal time estimate from back-end

    console.log("GoalsScreen rendered");
    console.log("User email: " + userEmail);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.titleText}>Your Goals</Text>
            </View>
            <View style={styles.bottomSection}>
                <View style={styles.blueBackdrop}>
                    {/*Display target weight*/}
                    <View style={styles.inputContainer}>
                        <Text style={styles.goalText}>Target Weight: </Text>
                        <Text style={styles.text}>160</Text>
                        <Text style={styles.text}> lbs</Text>
                    </View>

                    {/*Display time to completion*/}
                    <View style={styles.inputContainer}>
                        <Text style={styles.goalText}>Est. time to goal: </Text>
                        <Text style={styles.text}>3</Text>
                        <Text style={styles.text}> wks</Text>
                    </View>

                    <Text style={styles.titleText}>You're on track!</Text>
                    <Text style={styles.goalText}>Tips for reaching your goal:</Text>
                    <Text style={styles.tipText}>{'\u2B24'} Take things one at a time</Text>
                    <Text style={styles.tipText}>{'\u2B24'} Break goals down into steps</Text>
                    <Text style={styles.tipText}>{'\u2B24'} Focus on yourself, not others</Text>
                    <Text style={styles.tipText}>{'\u2B24'} Reward yourself when you make progress</Text>
                    <Text style={styles.tipText}>{'\u2B24'} Don't pay too much attention to immediate results</Text>
                    <Text style={styles.goalText}>"Setting goals is the first step in turning the invisible into the visible"{"\n"}     - Tony Robbins</Text>
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
    goalText: {
        fontSize: 25,
        color: 'white',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 25,
        color: 'white',
        marginBottom: 10,
    },
    tipText: {
        fontSize: 20,
        color: 'white',
        marginBottom: 10,
    },
    blueBackdrop: {
        backgroundColor: '#0A9BCB',
        flex: 1,
        width: '100%',
        borderRadius: 10,
        padding: 16
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default GoalsScreen;