import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'



interface ComponentProps {
    // navigation: NavigationProp<any | any>,
    text: string;
    onPress: (event?: any) => void;
}


export const GoBackButton = ({ onPress, text }: ComponentProps) => {
    return (
        <TouchableOpacity
            style={styles.backContainer}
            onPress={onPress}
        >
            <Ionicons
                name="arrow-back"
                size={32}
                color="#de2820"
            />

            <Text style={{ fontSize: 24, fontWeight: '800', marginLeft: 10, color: '#393939' }}>
                {text ?? "Back"}
            </Text>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    backContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
})