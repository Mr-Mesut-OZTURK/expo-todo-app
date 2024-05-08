import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { LinkedText } from '../links'
import { Button } from 'react-native-paper';


interface ComponentProps {
    title: string;
    rightText?: string;
    rightButton?: any;
    onPress?: (event?: any) => void;
    // before?: any;
    // after?: any;
    style?: any
}

export const SectionTitle = ({ rightText, rightButton, onPress, title, style }: ComponentProps) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title} >
                {title}
            </Text>
            {
                rightText ? (
                    <LinkedText
                        text={rightText}
                        onPress={onPress}
                    />
                ) : null
            }

            {
                rightButton ? (
                    <Button
                        onPress={onPress}
                        mode='contained'
                        style={{
                            borderRadius: 5,
                            backgroundColor: '#de2820',
                        }}
                    >
                        {rightButton}
                    </Button>
                ) : null
            }

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        // paddingHorizontal: 10,

    },
    title: {
        fontWeight: '700',
        fontSize: 24
    }

})