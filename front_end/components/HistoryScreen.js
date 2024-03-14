import React, {useState} from 'react';
import {statusBar} from 'expo-status-bar';
import {Modal, StyleSheet, View, Text, TextInput, Dimensions, SafeAreaView, Keyboard, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import { useSelector } from 'react-redux';


const HistoryScreen = () => {
    console.log("HistoryScreen rendered");
    
    const userEmail = useSelector(state => state.userEmail);
    console.log("User email: " + userEmail);

    {/* Instance and constant variables related to the date field */}
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('03/9/2024');
    const [dateInput, setDateInput] = useState('');

    {/* Only changes the date if the characters are valid (numbers and slashes) */}
    const handleDateChange = (input) => {
        console.log("User entered text for date change: ");
        console.log(input);
        if (/^[0-9/]*$/.test(input)) {
            setDateInput(input);
          }
        // setDateInput(input);
    }

    {/* Changes necessary variables when "Change Date" button is pressed */}
    const handleDateButtonPress = () => {
        console.log("User inputted new date");
        setOpen(!open);
        setSelectedDate(dateInput);
        setDateInput('');
        setIsPickerShow(!isPickerShow);
    };

    {/* Constant variables used for biometrics */}
    const [weight, setWeight] = useState(170); // in pounds
    const [activeTime, setActiveTime] = useState(30); // in minutes
    const [caloriesConsumed, setCaloriesConsumed] = useState(2000); // both variables in kcal
    const [caloriesBurned, setCaloriesBurned] = useState(1000);

    {/* Constant variables for the data and charts */}
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

    {/* Active time datapoints for past few days */}
    const data2 = {
        labels: ["3/2/2024", "3/3/2024", "3/4/2024", "3/5/2024", "3/6/2024", "3/7/2024", "3/8/2024"],
        datasets: [
            {
                data: [35, 53, 81, 66, 58, 74, 76],
                strokeWidth: 2,
            },
        ],
    };

    {/* Net Calories datapoints for past few days */}
    const data3 = {
        labels: ["3/2/2024", "3/3/2024", "3/4/2024", "3/5/2024", "3/6/2024", "3/7/2024", "3/8/2024"],
        datasets: [
            {
                data: [984, 1241, 1412, 544, 788, 1302, 1131],
                strokeWidth: 2,
            },
        ],
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.titleText}>History</Text>
            </View>
            <View style={styles.bottomSection}>
                <View style={styles.blueBackdrop}>

                    {/* Components for changing the date to display data from that date */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.normalText}></Text>

                            {/* Text style for date change box */}
                            <TextInput
                                style={styles.input}
                                keyboardType={'numbers-and-punctuation'}
                                placeholder="Input date in MM/DD/YYYY"
                                placeholderTextColor="#666"
                                value={dateInput}
                                onChangeText={handleDateChange}
                            />
                        {/* Orange button to change date */}
                        <TouchableOpacity
                            onPress={handleDateButtonPress}
                            style={styles.touchableOpacity}
                        >
                            <Text style={styles.buttonText}>Change Date</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Displays the Date */}
                    <View style={{flexDirection: 'row', justifyContent: 'start', width: '96%', marginBottom: 5}}>
                        <Text style={[styles.smallerSubText, {flex: 1}]}>
                            <Text style={styles.label}>Date: </Text>
                            {selectedDate}
                        </Text>
                        

                    </View>
                    
                    {/*Displays the weight & active time of the user at the top of the page*/}
                    <View style={{flexDirection: 'row', justifyContent: 'start', width: '96%', marginBottom: 5}}>
                        <Text style={[styles.smallerSubText, {flex: 1}]}>
                            <Text style={styles.label}>Weight: </Text>
                            {weight} lbs
                        </Text>

                        <Text style={[styles.smallerSubText, {flex: 1}]}>
                            <Text style={styles.label}>Active time: </Text>
                            {activeTime} min
                        </Text>
                    </View>
                    
                    {/*Displays the calories burned/consumed of the user*/}
                    <View style={{flexDirection: 'row', justifyContent: 'start', width: '96%', marginBotttom: 10}}>
                        <Text style={[styles.smallerSubText, {flex: 1}]}>
                            <Text style={styles.label}>Calories Consumed: </Text>
                            {caloriesConsumed} kcal
                        </Text>

                        <Text style={[styles.smallerSubText, {flex: 1}]}>
                            <Text style={styles.label}>Calories Burned: </Text>
                            {caloriesBurned} kcal
                        </Text>
                    </View>
                    
                    {/*Displays the weight of the user for the previous months*/}
                    <Text style={styles.subText}>Weight (in lbs)</Text>
                    <LineChart
                        data={data}
                        width={styles.chartStyle.width}
                        height={chartHeight}
                        chartConfig={chartConfig}
                        style={styles.chartStyle}
                    />

                    {/*Displays the active time graph for the previous months*/}
                    <Text style={[styles.subText, {marginTop: 20}]}>Active Time (in minutes)</Text>
                    <LineChart
                        data={data2}
                        width={styles.chartStyle.width}
                        height={chartHeight}
                        chartConfig={chartConfig}
                        style={styles.chartStyle}
                    />

                    {/*Displays the net calories of the user for the previous months*/}
                    <Text style={[styles.subText, {marginTop: 20}]}>Net Calories</Text>
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
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#11BCF5',
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        width: '60%',
        padding: 10,
        fontSize: 15,
        color: '#333',
        marginRight: 5,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginBottom: 10,
        marginTop: 5,
        justifyContent: 'space-between'
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

    smallerSubText: {
        fontSize: 17,
        color: 'white',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    label: {
        textDecorationLine: 'underline',
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
    },

    touchableOpacity: {
        borderRadius: 25,
        backgroundColor: '#FF7300',
        paddingVertical: 13,
        paddingHorizontal: 30,
        alignItems: 'center',
    },

    touchableOpacityMarginTop: {
        borderRadius: 25,
        backgroundColor: '#FF7300',
        paddingVertical: 13,
        paddingHorizontal: 30,
        alignItems: 'center',
        marginTop: 20
    },

    buttonText: {
        color: '#ffffff',
        fontSize: 15,
        paddingRight: 15
    }
})

export default HistoryScreen;