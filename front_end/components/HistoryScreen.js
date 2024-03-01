import React from 'react';
import {StyleSheet, View, Text, Dimensions, SafeAreaView} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
const HistoryScreen = () => {
    console.log("HistoryScreen rendered");

    const chartHeight = 170;

    const chartConfig = {
        backgroundColor: "#ff7300",
        backgroundGradientFrom: "#ff7300",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    };

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [190, 183, 175, 177, 178, 172],
            strokeWidth: 2, // optional
          },
        ],
    };

    const data2 = {
    labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
        {
            data: [35, 53, 81, 66, 58, 74],
            strokeWidth: 2, // optional
        },
        ],
    };

    const data3 = {
    labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
        {
            data: [984, 1241, 1412, 544, 788, 1302],
            strokeWidth: 2, // optional
        },
        ],
    };

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.topSection}>
            <Text style={styles.titleText}>History</Text>
        </View>
        <View style={styles.bottomSection}>
            <View style={styles.blueBackdrop}>
                <Text style={styles.subText}>Weight</Text>
                <LineChart
                    data={data}
                    width={styles.chartStyle.width}
                    height={chartHeight}
                    chartConfig={chartConfig}
                    style={styles.chartStyle}
                />

                <Text style={[styles.subText, { marginTop: 20 }]}>Active Time</Text>
                <LineChart
                    data={data2}
                    width={styles.chartStyle.width}
                    height={chartHeight}
                    chartConfig={chartConfig}
                    style={styles.chartStyle}
                />

                <Text style={[styles.subText, { marginTop: 20 }]}>Net Calories</Text>
                <LineChart
                    data={data3}
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
        backgroundColor: '#11BCF5',
        // alignItems: 'center',
        // justifyContent: 'center',
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

    subText: {
        fontSize: 25,
        color: 'white',
        marginBottom: 10,
        fontWeight: 'bold'
    },

    blueBackdrop: {
        backgroundColor: '#0A9BCB',
        flex: 1,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
    },

    chartStyle: {
        width: Dimensions.get("window").width - 32,
        borderRadius: 16
    }
})

export default HistoryScreen;