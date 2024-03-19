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

                {/* <View style={styles.upperContainer}>

                    <Image
                        style={styles.profileImage}
                        source={{ uri: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1483" }}
                    />
                    <View style={styles.upperInfoContainer}>

                        <Text style={styles.name}>Name Surname</Text>
                        <Text style={styles.email}>example@email.com</Text>
                    </View>

                </View> */}

                <Text style={styles.text}>
                    It will come soon!
                </Text>

                <Button
                    mode='contained'
                    style={styles.button}
                    buttonColor='#de2820'

                    onPress={async () => {
                        await AsyncStorage.removeItem('SIGNED');
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
        borderRadius: 5,
    },


    // upperContainer: {
    //     backgroundColor: '#f1f1f1',
    //     padding: 20,
    //     paddingBottom: 70,
    //     flexDirection: 'row',
    // },
    // profileImage: {
    //     width: 100,
    //     height: 100,
    //     borderRadius: 50,
    // },
    // upperInfoContainer: {
    //     marginLeft: 10,
    //     justifyContent: 'center',
    // },
    // name: {
    //     fontSize: 24,
    //     marginBottom: 5,
    //     fontWeight: '700'
    // },
    // email: {

    // },
})