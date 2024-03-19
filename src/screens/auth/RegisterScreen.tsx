import { Alert, StyleSheet, Text, Vibration, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AuthLayout } from '@/layouts'
import { Button, TextInput } from 'react-native-paper'
import { NavigationProp } from '@react-navigation/native'
import { fetchUser, insertUser, userTableInit } from '@/db'
import { IUserItem } from '@/types'
import Toast from 'react-native-toast-message';


interface ScreenProps {
    navigation: NavigationProp<any | any>
}

export const RegisterScreen = ({ navigation }: ScreenProps) => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        userTableInit();
    }, []);


    const handleSubmit = async () => {

        if (!name || !password) {
            Vibration.vibrate()
            Alert.alert('Alert', `Please enter ${!name && name} ${!password && password}`, [
                { text: 'OK', onPress: () => null },
            ]);
        } else {

            const res: Array<IUserItem> | any = await fetchUser({ name, password }, () => null)
            if (res?.[0]?.name !== name) {
                insertUser({ name, password }, () => {

                    Toast.show({
                        type: 'success',
                        text1: 'Hello',
                        text2: 'User created successfully, you can login 👋'
                    });

                    setTimeout(() => {
                        navigation.navigate("auth", { screen: 'login' })
                    }, 500)
                })
            } else {
                Vibration.vibrate()
                Alert.alert('Alert', `User already using!`, [
                    { text: 'OK', onPress: () => null },
                ]);
            }

        }

    }


    return (
        <AuthLayout>

            <Text
                style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 20,
                }}
            >
                Sign up
            </Text>

            <TextInput
                label="User Name"
                style={{
                    marginBottom: 10,
                    marginTop: 10,
                    borderRadius: 0,
                }}
                value={name}
                onChange={(e) => {
                    setName(e.nativeEvent.text)
                }}
            />

            <TextInput
                label="Password"

                style={{
                    marginBottom: 10,
                    marginTop: 10,
                    borderRadius: 0,
                }}
                value={password}
                onChange={(e) => {
                    setPassword(e.nativeEvent.text)
                }}
            />

            <Button
                mode='contained'
                style={{
                    borderRadius: 0,
                    marginBottom: 10,
                    marginTop: 10,
                    padding: 8
                }}
                onPress={() => {
                    handleSubmit()
                }}
                buttonColor='#de2820'
                disabled={!name || !password}
            >
                Sign Up
            </Button>


            <Button
                mode='text'
                style={{
                    borderRadius: 0,
                    marginBottom: 10,
                }}
                onPress={() => {
                    navigation.navigate("login")
                }}
            >
                Sign in
            </Button>




        </AuthLayout>
    )
}


const styles = StyleSheet.create({})