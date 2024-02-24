import { StyleSheet, Text, SafeAreaView } from 'react-native';

const HomeScreen = ({ navigation }) => {
    console.log("HomeScreen rendered");

    return (
        <SafeAreaView style={styles.container}>
            <Text> HomeScreen TODO </Text>
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

export default HomeScreen;