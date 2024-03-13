import {StyleSheet, Text, TextInput, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useState, useEffect} from "react";
import api from './api';
import axios from 'axios';

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

    // const handleFinishButtonPress = () => {
    //     console.log("Button pressed (AdvancedInfoInput -> HomeScreen)");
    //     console.log(height);
    //     console.log(weight);
    //     console.log(goal);
    //     onIntroComplete();
    // }
    const handleFinishButtonPress = async () => {
        console.log("Button pressed (AdvancedInfoInput -> HomeScreen)");
        const userInfo = {
            name,
            email,
            age: parseInt(age, 10), // Ensure age is an integer
            gender,
            weight: parseFloat(weight), // Ensure weight is a float
            height: parseFloat(height), // Ensure height is a float
            activity_level: '', // This should be handled accordingly
            goal
        };
        console.log(userInfo);
        try {
            // const response = await axios.post('http://127.0.0.1:8000/api/user/', {
            //     // 'name': name,
            //     // 'email': email,
            //     // 'age': age,
            //     // 'gender': gender,
            //     // 'weight': weight,
            //     // 'height': height,
            //     // 'target_weight': goal,
            //     "email": "benboben100@gmail.com",
            //     "name": "Ben Boben",
            //     "age": 0,
            //     "weight": 0,
            //     "height": 0,
            //     "gender": "male",
            //     "activity_level": "sedentary",
            //     "goal": "lose",
            //     "target_weight": 0
            // });
            const response = await axios.post('http://127.0.0.1:8000/api/user/', {
                "email": "benboben108@gmail.com",
                "name": "Ben Boben",
                "age": 0,
                "weight": 0,
                "height": 0,
                "gender": "male",
                "activity_level": "sedentary",
                "goal": "lose",
                "target_weight": 0
              });
    
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
})

export default AdvancedInfoScreen;