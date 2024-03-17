import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MainLayout } from '@/layouts'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp } from '@react-navigation/native'


interface ScreenProps {
    navigation: NavigationProp<any | any>
}


export const AccountScreen = ({ navigation }: ScreenProps) => {
    return (
        <MainLayout>
            <View style={styles.container}>
                <Text style={styles.text}>
                    It will come soon!
                </Text>

                <Button
                    mode='contained'
                    style={styles.button}
                    onPress={async () => {
                        await AsyncStorage.removeItem('ONBOARDED');
                        navigation.navigate("auth", { screen: 'login' })
                    }}
                >
                    Log out
                </Button>
            </View>
        </MainLayout>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20,
    },
    button: {
        borderRadius: 2,
    }
})