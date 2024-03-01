import {StyleSheet, Text, SafeAreaView, View} from 'react-native';
import React from "react";

const HomeScreen = () => {
    console.log("HomeScreen rendered");

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.quoteHeaderText}>Today's Quote</Text>

                {/*TODO pull quotes from database*/}
                <Text style={styles.quoteText}>"Take care of your body, it's the only place you have to live in."</Text>

                <Text style={styles.titleText}>Your Health Home</Text>
            </View>
            <View style={styles.bottomSection}>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryHeaderText}>Your Goals</Text>
                </View>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryHeaderText}>Today's Progress</Text>
                </View>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryHeaderText}>History Snapshot</Text>
                </View>
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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    quoteHeaderText: {
        fontSize: 25,
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
    },
    summaryBox: {
        backgroundColor: '#0A9BCB',
        flex: 1,
        width: '100%',
        borderRadius: 10,
        padding: 15,
        marginBottom: 5,
        marginTop: 5
    },
    summaryHeaderText: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    }
})

export default HomeScreen;