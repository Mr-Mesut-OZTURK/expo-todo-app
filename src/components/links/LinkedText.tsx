import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


interface ComponentProps {
    text: string;
    onPress?: (event?: any) => void;
    before?: any;
    after?: any;
}
export const LinkedText = ({ text, onPress, before, after }: ComponentProps) => {


    return (
        <View style={styles.container}>
            {before}
            <TouchableOpacity
                hitSlop={{ top: 25, bottom: 25, left: 15, right: 15 }}
                onPress={() => {
                    onPress && onPress()
                }}
            >
                <Text style={styles.text} >
                    {text ?? "See All sdf"}
                </Text>
            </TouchableOpacity>
            {after}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {

    },
    text: {
        color: '#333',
        // padding: 10,
        // backgroundColor: 'red'
    }

})