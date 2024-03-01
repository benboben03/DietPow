import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from './WelcomeScreen.js';
import BasicInfoInput from './BasicInfoInput.js';
import AdvancedInfoInput from './AdvancedInfoInput.js';
import HomeScreen from "./HomeScreen";
import GoalsScreen from "./GoalsScreen";
import TodayScreen from "./TodayScreen";
import HistoryScreen from "./HistoryScreen";
import SettingsScreen from "./SettingsScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="BasicInfoInput" component={BasicInfoInput} options={{headerShown: false}}/>
                <Stack.Screen name="AdvancedInfoInput" component={AdvancedInfoInput} options={{headerShown: false}}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="GoalsScreen" component={GoalsScreen} options={{headerShown: false}}/>
                <Stack.Screen name="TodayScreen" component={TodayScreen} options={{headerShown: false}}/>
                <Stack.Screen name="HistoryScreen" component={HistoryScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
