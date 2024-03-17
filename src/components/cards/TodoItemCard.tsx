import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ITodoItem } from '@/types'
import moment from 'moment';


interface TodoItemCardProps {
    item: ITodoItem;
    onLongPres?: (e?: any) => void;
    onPress?: (e?: any) => void;
}


export const TodoItemCard = ({ item, onLongPres, onPress }: TodoItemCardProps) => {
    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: item.isDone === "done" ? "gray" : '#191d21',
            }}
        >

            <View
                style={{
                    ...styles.coloredBar,
                    backgroundColor: item.isDone === "done" ? "green" : 'orange',
                }}
            />

            <TouchableOpacity
                style={styles.infoContainer}
                onLongPress={onLongPres}
                onPress={onPress}
            >
                <Text
                    style={{
                        ...styles.tag,
                        color: item.isDone === "done" ? "green" : 'orange',
                    }}
                >
                    {item?.title}
                </Text>

                <Text
                    style={{
                        ...styles.itemTitle,
                        color: item.isDone === "done" ? "#999" : '#fff',
                    }}
                >
                    {item?.title}
                </Text>

                <Text style={styles.date}>
                    {moment(item?.date).format("DD MMM YYYY")}
                    {/* 10:00 am - 12:00 am */}
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

        flex: 1,
        flexDirection: 'row',
    },
    coloredBar: {
        // backgroundColor: 'orange',
        width: 10,
        marginRight: 15,
        borderRadius: 5,
    },


    infoContainer: {
        // backgroundColor: '#191d21',
        flex: 1,
    },
    tag: {
        fontSize: 16,
        // color: 'orange',
    },
    itemTitle: {
        fontSize: 32,
        // color: '#fff',
    },
    date: {
        fontSize: 16,
        color: '#9a95d9',
        fontWeight: '900',
    },
})