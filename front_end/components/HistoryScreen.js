import DateTimePicker from '@react-native-community/datetimepicker';
import {getToday, getFormattedDate} from 'react-native-modern-datepicker';
import React, {useState} from 'react';
import {statusBar} from 'expo-status-bar';
import {Modal, StyleSheet, View, Text, Dimensions, SafeAreaView, TouchableOpacity} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import { format } from 'date-fns';


const HistoryScreen = () => {
    console.log("HistoryScreen rendered");

    {/* Instance and constant variables related to the date field */}
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('03/9/2024');
    
    // const today = new Date();
    // const startDate = getFormattedDate(today.setDate(today.getDate() + 1), 'DD/MM/YYYY');
    
    const today = new Date();
    const startDate = format(new Date(today.setDate(today.getDate() + 1)), 'dd/MM/yyyy');

    const handleDateButtonPress = () => {
        console.log("User selected a date: ");
        setOpen(!open);
        console.log(selectedDate);
        setIsPickerShow(!isPickerShow);
    };

    function handleChange (newDate) {
        setSelectedDate(format(newDate, 'MM/dd/yyyy'));
    }

    {/* Constant variables used for biometrics */}
    const [weight, setWeight] = useState(170); // in pounds
    const [activeTime, setActiveTime] = useState(30); // in minutes
    const [caloriesConsumed, setCaloriesConsumed] = useState(2000);
    const [caloriesBurned, setCaloriesBurned] = useState(1000);

    {/* Constant variables for the data and charts */}
    const chartHeight = 110;

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
                strokeWidth: 2,
            },
        ],
    };

    const data3 = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [984, 1241, 1412, 544, 788, 1302],
                strokeWidth: 2,
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
                    <View style={{flexDirection: 'row', justifyContent: 'start', width: '96%', marginBottom: 5}}>
                        <Text style={[styles.smallerSubText, {flex: 1}]}>
                            <Text style={styles.label}>Date: </Text>
                            {selectedDate}
                        </Text>
                        <TouchableOpacity
                            onPress={handleDateButtonPress}
                            style={styles.touchableOpacity}
                        >
                            <Text style={styles.buttonText}>Change Date</Text>
                        </TouchableOpacity>
                        <Modal
                        animationType='slide'
                        transparent={true}
                        visible={open}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <DateTimePicker
                                    value={new Date(selectedDate)}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        const currentDate = selectedDate || new Date();
                                        setOpen(false);
                                        setSelectedDate(currentDate);
                                    }}
                                    maximumDate={new Date}
                                    />
                                <TouchableOpacity
                            onPress={handleDateButtonPress}
                            style={styles.touchableOpacity}
                        >
                            <Text style={styles.buttonText}>Change Date</Text>
                        </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

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

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
        fontSize: 15
    }
})

export default HistoryScreen;