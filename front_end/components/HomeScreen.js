import {StyleSheet, Text, SafeAreaView, View, Dimensions} from 'react-native';
import {LineChart} from "react-native-chart-kit";
import React, { useState, useEffect }  from "react";
import api from './api';


const chartHeight = 110;

    const chartConfig = {
        backgroundColor: "#ff7300",
        backgroundGradientFrom: "#ff7300",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    };

{/* Weight datapoints for past few days */}
const data = {
    labels: ["3/2/2024", "3/3/2024", "3/4/2024", "3/5/2024", "3/6/2024", "3/7/2024", "3/8/2024"],
    datasets: [
        {
            data: [190, 183, 175, 177, 178, 172, 172],
            strokeWidth: 2,
        },
    ],
};

const HomeScreen = () => {
    console.log("HomeScreen rendered");
    const [quote, setQuote] = useState("");

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
                <Text style={styles.quoteHeaderText}>Today's Quote</Text>

                <Text style={styles.quoteText}>{quote}</Text>

                <Text style={styles.titleText}>Your Health Home</Text>
            </View>
            <View style={styles.bottomSection}>
                {/* Goals summary */}
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryHeaderText}>Your Goals</Text>
                        <Text style={styles.summaryText}>Target Weight: 160 lbs</Text>
                        <Text style={styles.summaryText}>Est. Time to Completion: 3 weeks</Text>
                        <Text style={styles.normalText}>Remember to consistently stay active!</Text>
                </View>

                {/* Progress summary */}
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryHeaderText}>Today's Progress</Text>
                    <Text style={styles.summaryText}>Weight: 170 lbs     Active Time: 30 mins</Text>
                    <Text style={styles.summaryText}>Calories Consumed: 2000</Text>
                    <Text style={styles.summaryText}>Calories Burned: 1000</Text>
                </View>

                {/* History summary */}
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryHeaderText}>History Snapshot</Text>
                    <LineChart
                        data={data}
                        width={styles.chartStyle.width}
                        height={chartHeight}
                        chartConfig={chartConfig}
                        style={styles.chartStyle}
                    />
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
    },
    summaryText: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold'
    },
    normalText: {
        fontSize: 15,
        color: 'white',
        // fontWeight: 'bold'
    }, 
    chartStyle: {
        width: Dimensions.get("window").width - 32,
        borderRadius: 16,
        marginLeft: -9,
        marginTop: 13,
    },
})

export default HomeScreen;