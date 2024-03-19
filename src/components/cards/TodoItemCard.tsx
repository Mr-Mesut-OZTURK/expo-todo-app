import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ITodoItem } from '@/types'
import moment from 'moment';
import { useAppSelector } from '@/context';


interface TodoItemCardProps {
    item: ITodoItem;
    onLongPres?: (e?: any) => void;
    onPress?: (e?: any) => void;
}


export const TodoItemCard = ({ item, onLongPres, onPress }: TodoItemCardProps) => {

    const { categories } = useAppSelector(state => state.category)

    const selectedCategory = categories?.find(c => c.title === item?.categoryId)
    // console.log({ selectedCategory, item });

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: item.isDone === "done" ? "gray" : '#233142',
                // backgroundColor: selectedCategory?.color ? `${selectedCategory?.color?.slice(0, 7)}66` : "#191d21"
            }}
        >

            <View
                style={{
                    ...styles.coloredBar,
                    backgroundColor: item.isDone === "done" ? "green" : selectedCategory?.color ? `${selectedCategory?.color?.slice(0, 7)}` : "orange",
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
                        color: item.isDone === "done" ? "green" : selectedCategory?.color ? `${selectedCategory?.color?.slice(0, 7)}` : "orange",
                    }}
                >
                    {selectedCategory?.title} -{moment(item?.date).format("DD MMM YYYY")}
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
                    {/* {moment(item?.date).format("DD MMM YYYY")} */}
                    {
                        item?.description //?.slice(0, 20)
                    }
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
        fontSize: 24,
        // color: '#fff',
    },
    date: {
        fontSize: 16,
        color: '#9a95d9',
        // fontWeight: '900',
    },
})