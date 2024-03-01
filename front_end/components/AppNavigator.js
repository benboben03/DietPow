import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from './WelcomeScreen.js';
import BasicInfoInput from './BasicInfoInput.js';
import AdvancedInfoInput from './AdvancedInfoInput.js';
import HomeScreen from "./HomeScreen";
import GoalsScreen from "./GoalsScreen";
import TodayScreen from "./TodayScreen";
import HistoryScreen from "./HistoryScreen";
import SettingsScreen from "./SettingsScreen";
import {useState} from "react";
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/*
This is the introduction pages that the user sees when they open the app
for the first time. After the user presses the Finish button on the last
page, they will be redirected to the main app tab pages.
 */
const IntroStack = ({ navigator, onIntroComplete }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="BasicInfoInput"
            component={BasicInfoInput}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="AdvancedInfoInput"
            options={{ headerShown: false }}
        >
            {(props) =>
                <AdvancedInfoInput {...props}
                            navigator={navigator}
                            onIntroComplete={onIntroComplete}
                />
            }
        </Stack.Screen>
    </Stack.Navigator>
);

const AppNavigator = () => {

    // Handles if the intro pages should be shown or not
    const [showIntro, setShowIntro] = useState(true);
    const handleIntroComplete = () => {
        setShowIntro(false);
    }

    return (
        <NavigationContainer>
            {/* If intro not shown yet, show it */}
            {showIntro ? (
                <Stack.Navigator>
                    <Stack.Screen
                        name="Intro"
                        options={{ headerShown: false }}
                    >
                        {(props) =>
                            <IntroStack {...props}
                                        navigator={navigator}
                                        onIntroComplete={handleIntroComplete}
                            />
                        }
                    </Stack.Screen>
                </Stack.Navigator>
            ) : (
                <Tab.Navigator
                    // Renders the tab bar on the bottom of the app
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            if (route.name === 'Home') {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name === 'Your Goals') {
                                iconName = focused ? 'body' : 'body-outline';
                            } else if (route.name === 'Today') {
                                iconName = focused ? 'today' : 'today-outline';
                            } else if (route.name === 'History') {
                                iconName = focused ? 'time' : 'time-outline';
                            } else if (route.name === 'Settings') {
                                iconName = focused ? 'settings' : 'settings-outline';
                            }

                            return <Icon name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: '#11BCF5',
                        tabBarInactiveTintColor: 'gray',
                    })}
                >
                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{headerShown: false}}
                    />
                    <Tab.Screen
                        name="Your Goals"
                        component={GoalsScreen}
                        options={{headerShown: false}}
                    />
                    <Tab.Screen
                        name="Today"
                        component={TodayScreen}
                        options={{headerShown: false}}
                    />
                    <Tab.Screen
                        name="History"
                        component={HistoryScreen}
                        options={{headerShown: false}}
                    />
                    <Tab.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={{headerShown: false}}
                    />
                </Tab.Navigator>
                )}
        </NavigationContainer>
    );
};

export default AppNavigator;
