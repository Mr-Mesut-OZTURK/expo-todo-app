import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { OnboardingScreen, SplashScreen } from '@/screens';
import { MainRouter } from './MainRouter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthRouter } from './AuthRouter';


const Stack = createStackNavigator()



export const AppRouter = () => {

    const [loading, setLoading] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [onboarded, setOnboarded] = useState(false);


    useEffect(() => {
        getStorage();
    }, []);


    const getStorage = async () => {
        await AsyncStorage.removeItem('ONBOARDED');

        const signed = await AsyncStorage.getItem('SIGNED');
        const onboarded = await AsyncStorage.getItem('ONBOARDED');
        setOnboarded(JSON.parse(onboarded ?? "false"));
        setIsSignedIn(JSON.parse(signed ?? "false"))
        setTimeout(() => {
            setLoading(false)
        }, 500)
    };


    if (loading) return <SplashScreen />

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={!onboarded ? "onboarding" : (isSignedIn ? "main" : "auth")}
            >

                <Stack.Screen
                    name='onboarding'
                    component={OnboardingScreen}
                    options={{
                        title: ""
                    }}
                />

                <Stack.Screen
                    name='main'
                    component={MainRouter}
                    options={{
                        title: ""
                    }}
                />

                <Stack.Screen
                    name='auth'
                    component={AuthRouter}
                    options={{
                        title: ""
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>

    )
}