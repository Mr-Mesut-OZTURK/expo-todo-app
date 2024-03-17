import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('@/assets/images/splash.png')}
            />
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    image: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
    }

})