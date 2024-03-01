import {StyleSheet, Text, SafeAreaView} from 'react-native';

const SettingsScreen = ({navigation}) => {
    console.log("SettingsScreen rendered");

    return (
        <SafeAreaView style={styles.container}>
            <Text> SettingsScreen TODO </Text>
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

export default SettingsScreen;