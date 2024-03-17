import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, RegisterScreen } from '@/screens'

const Stack = createStackNavigator()



export const AuthRouter = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="login"
                component={LoginScreen}
                options={{
                    title: "Login",
                }}
            />
            <Stack.Screen
                name="register"
                component={RegisterScreen}
                options={{
                    title: "Register",
                }}
            />
        </Stack.Navigator>
    )
}


const styles = StyleSheet.create({})