import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { NavigationProp } from '@react-navigation/native'
import { Alert, StyleSheet, Text, Vibration } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { IUserItem } from '@/types'
import { AuthLayout } from '@/layouts'
import { fetchUser, userTableInit } from '@/db'


interface ScreenProps {
    navigation: NavigationProp<any | any>
}

export const LoginScreen = ({ navigation }: ScreenProps) => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")


    useEffect(() => {
        userTableInit();
    }, []);


    const handleSubmit = async () => {

        if (!name || !password) {
            Vibration.vibrate()
            Alert.alert('Alert', `Please enter ${!name ? "name" : ""} ${!password ? "password" : ""}`, [

                { text: 'OK', onPress: () => null },
            ]);
        } else {

            const res: Array<IUserItem> | any = await fetchUser({ name, password }, () => null)
            console.log({ res });
            if (!!res?.length) {
                console.log({ res });
                AsyncStorage.setItem('SIGNED', JSON.stringify(res?.[0]?.id ?? ""));
                navigation.navigate("main", { screen: "tabScreens", params: { screen: "home" } })
            } else {
                console.log({ res });
                Vibration.vibrate()
                Alert.alert('Alert', `Wrong name or password!`, [
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
                Sign in
            </Text>

            <TextInput
                label="User Name"
                style={{
                    marginBottom: 10,
                    marginTop: 10,
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
                    // fontSize: 26,
                }}
                value={password}
                onChange={(e) => {
                    setPassword(e.nativeEvent.text)
                }}
            />

            <Button
                mode='contained'
                style={{
                    borderRadius: 5,
                    marginBottom: 10,
                    marginTop: 10,
                    padding: 8,

                }}
                onPress={() => {
                    handleSubmit()
                }}
                disabled={!name || !password}
            >
                Login
            </Button>


            <Button
                mode='text'
                style={{
                    borderRadius: 0,
                    marginBottom: 10,
                    // marginTop: 10,
                    // padding: 8
                }}
                onPress={() => {
                    // handleAddTodo()
                    navigation.navigate("register")
                }}
            >
                Sign up
            </Button>




        </AuthLayout>
    )
}


const styles = StyleSheet.create({})