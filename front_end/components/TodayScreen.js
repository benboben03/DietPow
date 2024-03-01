import {StyleSheet, Text, SafeAreaView} from 'react-native';

const TodayScreen = ({navigation}) => {
    console.log("TodayScreen rendered");

    return (
        <SafeAreaView style={styles.container}>
            <Text> TodayScreen TODO </Text>
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

export default TodayScreen;