import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ITodoItem } from '@/types'


interface TodoItemCardProps {
    item: ITodoItem;
    onLongPres?: (e?: any) => void;
    onPress?: (e?: any) => void;
}


export const TodoItemCard = ({ item, onLongPres, onPress }: TodoItemCardProps) => {
    return (
        <View style={styles.container}>

            <View style={styles.coloredBar} />

            <TouchableOpacity
                style={styles.infoContainer}
                onLongPress={onLongPres}
                onPress={onPress}
            >
                <Text style={styles.tag}>
                    {item?.title}
                </Text>

                <Text style={styles.itemTitle}>
                    {item?.title}
                </Text>

                <Text style={styles.date}>
                    {/* {item?.title} */}
                    10:00 am - 12:00 am
                </Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#191d21',
        flex: 1,
        flexDirection: 'row',
    },
    coloredBar: {
        backgroundColor: 'orange',
        width: 10,
        marginRight: 15,
        borderRadius: 5,
    },


    infoContainer: {
        backgroundColor: '#191d21',
        flex: 1,
    },
    tag: {
        fontSize: 16,
        color: 'orange',
    },
    itemTitle: {
        fontSize: 32,
        color: '#fff',
    },
    date: {
        fontSize: 16,
        color: 'purple',
        fontWeight: '900',
    },
})