import {StyleSheet, Text, SafeAreaView, View} from 'react-native';

const HomeScreen = () => {
    console.log("HomeScreen rendered");

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.quoteHeaderText}>Today's Quote</Text>

                {/*TODO pull quotes from database*/}
                <Text style={styles.quoteText}>"Take care of your body, it's the only place you have to live in."{"\n"}</Text>

                <Text style={styles.titleText}>Your Health Home</Text>
            </View>
            <View style={styles.bottomSection}>
                <Text>HomeScreen TODO</Text>
            </View>
        </SafeAreaView>
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
        alignItems: 'center'
    },
    quoteHeaderText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    quoteText: {
        fontSize: 20,
        color: 'white'
    },
    titleText: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold'
    }
})

export default HomeScreen;