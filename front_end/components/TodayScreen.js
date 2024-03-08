import {StyleSheet, Text, SafeAreaView, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from "react";

const TodayScreen = () => {
    console.log("TodayScreen rendered");

    const [breakfastCalories, setBreakfastCalories] = useState(0)
    const handleBreakfastCaloriesTextChange = (calories) => {
        console.log("User entered text for breakfast calories: ");
        console.log(calories);
        setBreakfastCalories(calories);
    }

    const [lunchCalories, setLunchCalories] = useState(0)
    const handleLunchCaloriesTextChange = (calories) => {
        console.log("User entered text for lunch calories: ");
        console.log(calories);
        setLunchCalories(calories);
    }

    const [dinnerCalories, setDinnerCalories] = useState(0)
    const handleDinnerCaloriesTextChange = (calories) => {
        console.log("User entered text for dinner calories: ");
        console.log(calories);
        setDinnerCalories(calories);
    }

    const [newWeight, setNewWeight] = useState(0.0)
    const handleNewWeightTextChange = (weight) => {
        console.log("User entered text for new weight: ");
        console.log(weight);
        setNewWeight(weight);
    }

    const handleSubmitButtonPress = () => {
        console.log("User updated today with: ");
        console.log(newWeight);
        console.log(breakfastCalories);
        console.log(lunchCalories);
        console.log(dinnerCalories);
        // TODO link with back-end
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.titleText}>Today's Progress</Text>
            </View>
            <View style={styles.bottomSection}>
                <View style={styles.blueBackdrop}>
                    <Text style={styles.settingsText}>Enter today's recordings:</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.normalText}>Weight:</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType={'numeric'}
                            placeholder="Enter current weight"
                            placeholderTextColor="#666"
                            onChangeText={handleNewWeightTextChange}
                        />
                    </View>

                    <Text style={styles.settingsText}>Calories consumed:</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.normalText}>Breakfast:</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType={'numeric'}
                            placeholder="Breakfast calories..."
                            placeholderTextColor="#666"
                            onChangeText={handleBreakfastCaloriesTextChange}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.normalText}>Lunch:</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType={'numeric'}
                            placeholder="Lunch calories..."
                            placeholderTextColor="#666"
                            onChangeText={handleLunchCaloriesTextChange}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.normalText}>Dinner</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType={'numeric'}
                            placeholder="Dinner calories..."
                            placeholderTextColor="#666"
                            onChangeText={handleDinnerCaloriesTextChange}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleSubmitButtonPress}
                        style={styles.touchableOpacity}
                    >
                        <Text style={styles.buttonText}>Submit today's recordings</Text>
                    </TouchableOpacity>
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
    normalText: {
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
    input: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        width: '60%',
        padding: 10,
        fontSize: 15,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginBottom: 20,
        marginTop: 10,
        justifyContent: 'space-between'
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

export default TodayScreen;