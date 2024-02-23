import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView , Image, TextInput, TouchableOpacity } from 'react-native';


const AdvancedInfoScreen = ({ navigation }) => {
    console.log("AdvancedInfoInput rendered");

    return (
        <SafeAreaView style={styles.container}>
            <Text> AdvancedInfoScreen TODO </Text>
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
})

export default AdvancedInfoScreen;