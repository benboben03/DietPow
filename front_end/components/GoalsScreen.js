import {StyleSheet, Text, SafeAreaView, View, TextInput, TouchableOpacity} from 'react-native';
import React, { useState, useEffect }  from "react";
import { useSelector } from 'react-redux';
import api from './api';

const GoalsScreen = () => {

    const [goalTime, setGoalTime] = useState(0);
    const [tips, setTips] = useState([]);
    const [track, setTrack] = useState([]);
    const [quote, setQuote] = useState("");


    // Fetch user email and target_weight from redux store
    const userEmail = useSelector(state => state.userEmail);
    const targetWeight = useSelector(state => state.targetWeight);

    console.log("GoalsScreen rendered");
    console.log("User email: " + userEmail);

    useEffect(() => {
        fetchGoalData();
    }, []); // Fetch data when component mounts

    const fetchGoalData = async () => {
        try {
            // Fetch estimated time to goal
            const goalTimeResponse = await  api.get(`/api/days-to-goal?email=${userEmail}`);
            setGoalTime(goalTimeResponse.data.days_to_goal);

            // Fetch tips/health track
            const tipsResponse = await api.get(`/api/health-tip?email=${userEmail}`);
            setTips(tipsResponse.data.tip);
            setTrack(tipsResponse.data.health_level);

        } catch (error) {
            console.error('Error fetching goal data:', error);
        }
    };


    useEffect(() => {
        fetchQuoteOfTheDay();
    }, []);

    const fetchQuoteOfTheDay = async () => {
        try {
            const response = await api.get('/api/quote-of-the-day/');
            setQuote(response.data.quote);
        } catch (error) {
            console.error("Error fetching quote:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.titleText}>Your Goals</Text>
            </View>
            <View style={styles.bottomSection}>
                <View style={styles.blueBackdrop}>
                    {/*Display target weight*/}
                    <View style={styles.inputContainer}>
                        <Text style={styles.goalText}>Target Weight: </Text>
                        <Text style={styles.text}>{targetWeight}</Text>
                        <Text style={styles.text}> lbs</Text>
                    </View>

                    {/*Display time to completion*/}
                    <View style={styles.inputContainer}>
                        <Text style={styles.goalText}>Est. time to goal: </Text>
                        <Text style={styles.text}>{goalTime}</Text>
                        <Text style={styles.text}> days</Text>
                    </View>

                    <Text style={styles.titleText}>{track}</Text>
                    <Text style={styles.goalText}>Tips for reaching your goal:</Text>
                    {/* Display tips */}
                    <Text style={styles.tipText}>{tips}</Text>
                    <Text style={styles.quoteText}>{quote}</Text>
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
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10
    },
    titleText: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold'
    },
    goalText: {
        fontSize: 25,
        color: 'white',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 25,
        color: 'white',
        marginBottom: 10,
    },
    tipText: {
        fontSize: 25,
        color: 'white',
        marginBottom: 60,
    },
    quoteText: {
        fontSize: 22,
        color: 'white',
        marginBottom: 50,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    blueBackdrop: {
        backgroundColor: '#0A9BCB',
        flex: 1,
        width: '100%',
        borderRadius: 10,
        padding: 16
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default GoalsScreen;