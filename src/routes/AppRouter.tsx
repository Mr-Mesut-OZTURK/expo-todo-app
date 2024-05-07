import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MainRouter } from './MainRouter';
import { AuthRouter } from './AuthRouter';
import { OnboardingScreen, SplashScreen } from '@/screens';


const Stack = createStackNavigator()



export const AppRouter = () => {

    const [loading, setLoading] = useState(true);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [onboarded, setOnboarded] = useState(false);


    useEffect(() => {
        getStorage();
    }, []);


    const getStorage = async () => {
        // await AsyncStorage.removeItem('ONBOARDED');

        const signed = await AsyncStorage.getItem('SIGNED');
        setIsSignedIn(JSON.parse(signed ?? "false"))
        const onboarded = await AsyncStorage.getItem('ONBOARDED');
        setOnboarded(JSON.parse(onboarded ?? "false"));
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

                <Stack.Screen name='onboarding' component={OnboardingScreen} />
                <Stack.Screen name='main' component={MainRouter} />
                <Stack.Screen name='auth' component={AuthRouter} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}