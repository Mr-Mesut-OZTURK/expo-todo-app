import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'


interface ComponentProps {
    // navigation: NavigationProp<any | any>,
    loading: boolean
}

export const Loading = ({ loading }: ComponentProps) => {

    if (!loading) return null
    return (
        <View
            style={{
                width: Dimensions.get("screen").width,
                height: Dimensions.get("screen").height,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "#ffffff99",
                position: 'absolute',
            }}
        >
            <ActivityIndicator />
        </View>
    )
}


const styles = StyleSheet.create({})