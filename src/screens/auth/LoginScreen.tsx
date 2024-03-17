import { Alert, StyleSheet, Text, Vibration, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AuthLayout } from '@/layouts'
import { Button, TextInput } from 'react-native-paper'
import { NavigationProp } from '@react-navigation/native'
import { fetchUser, userTableInit } from '@/db'
import { IUserItem } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'


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
            console.log("object");
            Vibration.vibrate()
            Alert.alert('Alert', `Please enter ${!name ? "name" : ""} ${!password ? "password" : ""}`, [
                // {
                //   text: 'Cancel',
                //   onPress: () => console.log('Cancel Pressed'),
                //   style: 'cancel',
                // },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        } else {

            const res: Array<IUserItem> | any = await fetchUser({ name, password }, () => null)
            if (!!res?.length) {
                AsyncStorage.setItem('SIGNED', "true");
                navigation.navigate("main", { screen: "tabScreens", params: { screen: "home" } })
            } else {
                Vibration.vibrate()
                Alert.alert('Alert', `Wrong name or password!`, [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
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
                    // console.log("object");
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