import React from 'react'
import { Dimensions, Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'


interface AuthLayoutProps {
    children: React.ReactNode
}


export const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.innerContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('@/assets/logos/logo.png')}
                    />
                </View>

                {children}
            </View>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    innerContainer: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
    }
})