import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from './WelcomeScreen.js';
import BasicInfoInput from './BasicInfoInput.js';
import AdvancedInfoInput from './AdvancedInfoInput.js';
import HomeScreen from "./HomeScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="BasicInfoInput" component={BasicInfoInput} options={{headerShown: false}}/>
                <Stack.Screen name="AdvancedInfoInput" component={AdvancedInfoInput} options={{headerShown: false}}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
