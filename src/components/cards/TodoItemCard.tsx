import React from 'react'
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { ITodoItem } from '@/types'
import { useAppSelector } from '@/context';


interface TodoItemCardProps {
    item: ITodoItem;
    onDelete?: (e?: any) => void;
    onPress?: (e?: any) => void;
}


export const TodoItemCard = ({ item, onDelete, onPress }: TodoItemCardProps) => {

    const { categories } = useAppSelector(state => state.category)
    const selectedCategory = categories?.find(c => c.title === item?.categoryId)


    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: item.isDone === "done" ? "#ccc" : '#233142',
                borderColor: item.isDone === "done" ? "#233142" : '#fff',
                borderWidth: item.isDone === "done" ? 1 : 0,
            }}
        >

            <View
                style={{
                    ...styles.coloredBar,
                    backgroundColor: item.isDone === "done" ? "green" : selectedCategory?.color ? `${selectedCategory?.color?.slice(0, 7)}` : "gray",
                }}
            />

            <TouchableOpacity
                style={styles.infoContainer}
                onPress={onPress}
            >
                <Text
                    style={{
                        ...styles.tag,
                        color: item.isDone === "done" ? "green" : selectedCategory?.color ? `${selectedCategory?.color?.slice(0, 7)}` : "gray",
                    }}
                >
                    {selectedCategory?.title ?? "Deleted"} -{moment(item?.date).format("DD MMM YYYY")}
                </Text>

                <Text
                    style={{
                        ...styles.itemTitle,
                        color: item.isDone === "done" ? "#333" : '#fff',
                        textDecorationLine: item.isDone === "done" ? "line-through" : 'none',
                    }}
                >
                    {item?.title}
                </Text>

                <Text
                    style={{
                        ...styles.date,
                        textDecorationLine: item.isDone === "done" ? "line-through" : 'none',
                        color: item.isDone === "done" ? "#666" : '#9a95d9',
                    }}
                >
                    {
                        item?.description //?.slice(0, 20)
                    }
                </Text>
            </TouchableOpacity>

            <Ionicons
                onPress={onDelete}
                name="trash"
                size={32}
                color="gray"
            // color="#de2820"
            />
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
        fontSize: 24,
        // color: '#fff',
    },
    date: {
        fontSize: 16,
        // color: '#9a95d9',
        // fontWeight: '900',
    },
})