import {StyleSheet, Text, SafeAreaView, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAwareScrollView, Modal} from 'react-native';
import React, {useState} from "react";
import {ActivityPicker} from './pickers/ActivityPicker';
import { useSelector } from 'react-redux';


const TodayScreen = () => {
    console.log("TodayScreen rendered");

    const userEmail = useSelector(state => state.userEmail);
    console.log("User email: " + userEmail);    

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

    const [calsBurned, setCalsBurned] = useState(0.0)
    const handleCaloriesBurnedTextChange = (burned) => {
        console.log("User entered text for calories burned: ");
        console.log(burned);
        setCalsBurned(burned);
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

    const handleSubmitActivityButtonPress = () => {
        console.log("User added activity with: ");
        console.log(chooseActivity);
        console.log(calsBurned);
        // TODO link with back-end
    }

    const [chooseActivity, setChooseActivity] = useState('Select Activity')
    const [isActivityVisible, setIsActivityVisible] = useState(false)
    const setActivity = (option) => {
        console.log("User chose activity: ");
        console.log(option);
        setChooseActivity(option);
    }
    const changeActivityVisibility = (bool) => {
        setIsActivityVisible(bool)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <View style={styles.topSection}>
                    <Text style={styles.titleText}>Today's Progress</Text>
                </View>
                <View style={styles.bottomSection}>
                    <View style={styles.blueBackdrop}>
                        <Text style={styles.settingsText}>Enter a new activity:</Text>

                        {/*Activity*/}
                        <View style={styles.inputContainer}>
                            <Text style={styles.normalText}>Activity:</Text>

                            <TouchableOpacity
                                onPress={() => changeActivityVisibility(true)}
                                style={styles.pickerTouchableOpacity}
                            >
                                <Text style={styles.optionText}>{chooseActivity}</Text>

                            </TouchableOpacity>

                            {/*Controls the pop-up picker for activity*/}
                            <Modal
                                transparent={true}
                                animationType='fade'
                                visible={isActivityVisible}
                                nRequestClose={() => changeActivityVisibility(false)}
                            >
                                <ActivityPicker
                                    changeModalVisibility={changeActivityVisibility}
                                    setData={setActivity}
                                />

                            </Modal>
                        </View>

                        {/*Burned calories*/}
                        <View style={styles.inputContainer}>
                            <Text style={styles.normalText}>Burned:</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType={'numeric'}
                                placeholder="Calories burned..."
                                placeholderTextColor="#666"
                                onChangeText={handleCaloriesBurnedTextChange}
                            />
                        </View>

                        {/*Submit activity button*/}
                        <TouchableOpacity
                            onPress={handleSubmitActivityButtonPress}
                            style={styles.touchableOpacity}
                        >
                            <Text style={styles.buttonText}>Submit activity</Text>
                        </TouchableOpacity>

                        {/*Breakfast Calories*/}
                        <Text style={styles.settingsText}>Today's Recordings:</Text>
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

                        {/*Lunch calories*/}
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

                        {/*Dinner calories*/}
                        <View style={styles.inputContainer}>
                            <Text style={styles.normalText}>Dinner:</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType={'numeric'}
                                placeholder="Dinner calories..."
                                placeholderTextColor="#666"
                                onChangeText={handleDinnerCaloriesTextChange}
                            />
                        </View>

                        {/*Weight*/}
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

                        {/*Submit button*/}
                        <TouchableOpacity
                            onPress={handleSubmitButtonPress}
                            style={styles.touchableOpacity}
                        >
                            <Text style={styles.buttonText}>Submit today's recordings</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
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
        fontWeight: 'bold',
    },
    settingsText: {
        fontSize: 25,
        color: 'white',
        marginBottom: 10,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
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
        marginBottom: 10,
        marginTop: 5,
        justifyContent: 'space-between'
    },
    touchableOpacity: {
        borderRadius: 25,
        backgroundColor: '#FF7300',
        paddingVertical: 13,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    pickerTouchableOpacity: {
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        paddingVertical: 13,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 15
    },
    quoteHeaderText: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginTop: 30
    },
    quoteText: {
        fontSize: 20,
        color: 'white'
    }
})

export default TodayScreen;