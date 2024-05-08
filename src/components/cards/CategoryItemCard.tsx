import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { ICategoryItem } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight } from 'react-native-reanimated';


interface ComponentProps {
    item: ICategoryItem;
    index?: number;
    onLongPres?: (e?: any) => void;
    onPress?: (e?: any) => any;
    onDelete?: (e?: any) => void;
}

export const CategoryItemCard = memo(({ item, onPress, onDelete, index = 0 }: ComponentProps) => {


    return (
        <Animated.View entering={FadeInRight.delay(index * 200)}>
            <TouchableOpacity
                onPress={() => onPress && onPress(item)}
                style={{
                    ...styles.container,
                    ...(onDelete && { backgroundColor: `${item.color.slice(0, 7)}33` ?? "#fff" }),
                    justifyContent: onDelete ? 'space-between' : 'center',
                    borderColor: `${item.color.slice(0, 7)}99` ?? "#000",
                    borderWidth: 2,

                }}
            >
                <Text
                    style={{
                        color: `${item.color.slice(0, 7)}` ?? "#000",
                        fontWeight: '700',
                        fontSize: 28

                    }}
                >
                    {item.title}
                </Text>

                {onDelete && (<Ionicons
                    name="trash"
                    size={40}
                    color="#be3144"
                    // color={`${item.color.slice(0, 7)}` ?? "#000"}


                    onPress={onDelete}
                />)}
            </TouchableOpacity>
        </Animated.View>
    )
})


const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#000000',
        marginHorizontal: 10,
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        height: 100,
        alignItems: 'center',
        marginBottom: 20,
        minWidth: 100,
        flexDirection: 'row',

    }
})