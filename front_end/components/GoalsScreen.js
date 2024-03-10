import {StyleSheet, Text, SafeAreaView, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from "react";

const GoalsScreen = () => {

    const [goalWeight, setGoalWeight] = useState(0.0);
    const [goalTime, setGoalTime] = useState(0);

    // TODO get goal weight from back-end
    // TODO get goal time estimate from back-end

    console.log("GoalsScreen rendered");

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
                        <Text style={styles.text}>{goalWeight}</Text>
                        <Text style={styles.text}> lbs</Text>
                    </View>

                    {/*Display time to completion*/}
                    <View style={styles.inputContainer}>
                        <Text style={styles.goalText}>Est. time to goal: </Text>
                        <Text style={styles.text}>{goalTime}</Text>
                        <Text style={styles.text}> wks</Text>
                    </View>

                    <Text style={styles.goalText}> TODO </Text>
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