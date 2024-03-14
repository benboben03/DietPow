import {StyleSheet, Modal, Text, TextInput, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useState, useEffect} from "react";
import { ActivityLevelPicker } from './pickers/ActivityLevelPicker';
import {GoalPicker} from './pickers/GoalPicker';
import api from './api';

const AdvancedInfoScreen = ({onIntroComplete, route}) => {
    console.log("AdvancedInfoInput rendered");
    // Get the basic info from the previous screen
    const { basicInfo } = route.params;
    const name = basicInfo.name;
    const email = basicInfo.email;
    const age = basicInfo.age;
    const gender = basicInfo.gender;
    // The data for this screen
    const [weight, setWeight] = useState(0.0);
    const [height, setHeight] = useState(0.0);
    const [goal, setGoal] = useState(0.0);

    // Added information for Losing, Gaining, or Maintaining weight
    const [chooseWeightGoal, setChooseWeightGoal] = useState('Select weight goal')
    const [chooseActivityLevel, setChooseActivityLevel] = useState('Select activity level')
    const [isWeightGoalVisible, setIsWeightGoalVisible] = useState(false)
    const [isActivityLevelVisible, setIsActivityLevelVisible] = useState(false)
    
    const changeWeightGoalVisibility = (bool) => {
        setIsWeightGoalVisible(bool)
    }

    const changeActivityLevelVisibility = (bool) => {
        setIsActivityLevelVisible(bool)
    }

    const setWeightGoal = (option) => {
        console.log("User chose weight goal: ");
        console.log(option);
        setChooseWeightGoal(option);
    }

    const setActivityLevel = (option) => {
        console.log("User chose activity level: ");
        console.log(option);
        setChooseActivityLevel(option);
    }
    // end of added info

    const handleHeightTextChange = (text) => {
        console.log("User entered text for height: ");
        console.log(text);
        setHeight(text);
    }

    const handleWeightTextChange = (text) => {
        console.log("User entered text for weight: ");
        console.log(text);
        setWeight(text);
    }

    const handleGoalTextChange = (text) => {
        console.log("User entered text for goal: ");
        console.log(text);
        setGoal(text);
    }


    const handleFinishButtonPress = async () => {
        console.log("Button pressed (AdvancedInfoInput -> HomeScreen)");
        const userInfo = {
            'name': name,
            'email': email,
            'age': age,
            'gender': gender,
            'weight': weight,
            'height': height,
            'target_weight': goal,
            "activity_level": "sedentary",
            "goal": "lose",
        };
        console.log(userInfo);
        try {
            const response = await api.post('/api/user/', userInfo);
            if (response.status === 200) {
                const data = response.data;
                console.log('User created:', data);
                onIntroComplete(); // Or navigate to the home screen
            } else {
                console.error('Failed to create user:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
            console.error('Error making API call:', error.response ? error.response.data : error.message);

        }
    };
    //     try {
    //         // Try to fetch the user first
    //         const fetchResponse = await api.get(`/api/user/${email}`);
            
    //         if (fetchResponse.status === 200 && fetchResponse.data) {
    //             // User exists, send a PUT request to update
    //             const updateResponse = await api.put(`/api/user/${email}`, userInfo);
    //             console.log('User updated:', updateResponse.data);
    //             onIntroComplete();
    //         } else {
    //             throw new Error('User not found, creating a new one.');
    //         }
    //     } catch (error) {
    //         if (error.response && error.response.status === 404) {
    //             // User does not exist, send a POST request to create
    //             const createResponse = await api.post('/api/user/', userInfo);
    //             console.log('User created:', createResponse.data);
    //             onIntroComplete();
    //         } else {
    //             // Handle other errors
    //             console.error('Error:', error);
    //         }
    //     }
    // };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.infoText}> Now that we have the basics,{"\n"}please input your
                    current{"\n"}biometrics </Text>
                <TextInput
                    style={styles.input}
                    keyboardType={'numeric'}
                    placeholder="Enter your height (in inches)"
                    placeholderTextColor="#666"
                    onChangeText={handleHeightTextChange}
                />
                <TextInput
                    style={styles.input}
                    keyboardType={'numeric'}
                    placeholder="Enter your weight (in lbs)"
                    placeholderTextColor="#666"
                    onChangeText={handleWeightTextChange}
                />

                <Text style={styles.infoText}> {"\n\n"}What is your weight goal? </Text>
                <TextInput
                    style={styles.input}
                    keyboardType={'numeric'}
                    placeholder="Enter your goal (in lbs)"
                    placeholderTextColor="#666"
                    onChangeText={handleGoalTextChange}
                />

<               Text style={styles.infoText}>What is your weight goal?</Text>
                    <TouchableOpacity
                        onPress={() => changeWeightGoalVisibility(true)}
                        style={styles.touchableOpacity}
                    >
                        <Text style={styles.optionText}>{chooseWeightGoal}</Text>

                    </TouchableOpacity>

                    {/*Controls the pop-up picker for weight goal*/}
                    <Modal
                        transparent={true}
                        animationType='fade'
                        visible={isWeightGoalVisible}
                        nRequestClose={() => changeWeightGoalVisibility(false)}
                    >
                        <GoalPicker
                            changeModalVisibility={changeWeightGoalVisibility}
                            setData={setWeightGoal}
                        />

                    </Modal>

                <Text style={styles.infoText}>What is your predicted activity level?</Text>
                    <TouchableOpacity
                        onPress={() => changeActivityLevelVisibility(true)}
                        style={styles.touchableOpacity}
                    >
                        <Text style={styles.optionText}>{chooseActivityLevel}</Text>

                    </TouchableOpacity>

                    {/*Controls the pop-up picker for activity level*/}
                    <Modal
                        transparent={true}
                        animationType='fade'
                        visible={isActivityLevelVisible}
                        nRequestClose={() => changeActivityLevelVisibility(false)}
                    >
                        <ActivityLevelPicker
                            changeModalVisibility={changeActivityLevelVisibility}
                            setData={setActivityLevel}
                        />

                    </Modal>

                <Text style={styles.infoText}> {"\n\n"}You're all set!{"\n"}Let's go to the home page </Text>
                <TouchableOpacity style={styles.button} onPress={handleFinishButtonPress}>
                    <Text style={styles.buttonText}>Finish</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#11BCF5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 21,
        fontWeight: 'bold',
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
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
})

export default AdvancedInfoScreen;