import {StyleSheet, Text, SafeAreaView} from 'react-native';

const GoalsScreen = () => {
    console.log("GoalsScreen rendered");

    return (
        <SafeAreaView style={styles.container}>
            <Text> GoalsScreen TODO </Text>
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

export default GoalsScreen;