import {StyleSheet, Text, SafeAreaView} from 'react-native';

const HistoryScreen = () => {
    console.log("HistoryScreen rendered");

    return (
        <SafeAreaView style={styles.container}>
            <Text> HistoryScreen TODO </Text>
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

export default HistoryScreen;