import {StyleSheet, Text, TextInput, SafeAreaView, TouchableOpacity} from 'react-native';

const AdvancedInfoScreen = ({onIntroComplete}) => {
    console.log("AdvancedInfoInput rendered");

    const handleHeightTextChange = (text) => {
        console.log("User entered text for height: ");
        console.log(text);
    }

    const handleWeightTextChange = (text) => {
        console.log("User entered text for weight: ");
        console.log(text);
    }

    const handleGoalTextChange = (text) => {
        console.log("User entered text for goal: ");
        console.log(text);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.infoText}> Now that we have the basics,{"\n"}please input your
                current{"\n"}biometrics </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your height (in inches)"
                placeholderTextColor="#666"
                onChangeText={handleHeightTextChange}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your weight (in lbs)"
                placeholderTextColor="#666"
                onChangeText={handleWeightTextChange}
            />

            <Text style={styles.infoText}> {"\n\n"}What is your weight goal? </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your goal (in lbs)"
                placeholderTextColor="#666"
                onChangeText={handleGoalTextChange}
            />

            <Text style={styles.infoText}> {"\n\n"}You're all set!{"\n"}Let's go to the home page </Text>
            <TouchableOpacity style={styles.button} onPress={onIntroComplete}>
                <Text style={styles.buttonText}>Finish</Text>
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