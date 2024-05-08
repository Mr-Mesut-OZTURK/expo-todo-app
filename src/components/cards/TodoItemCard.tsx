import React, { memo, useEffect, useRef, useState } from 'react'
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { ITodoItem } from '@/types'
import { useAppSelector } from '@/context';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { ActivityIndicator } from 'react-native-paper';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';


interface TodoItemCardProps {
    item: ITodoItem;
    index?: number;
    onDelete?: (e?: any) => void;
    onPress?: (e?: any) => void;
    loading?: boolean;
}


export const TodoItemCard = memo(({ item, onDelete, onPress, loading, index = 0 }: TodoItemCardProps) => {

    const { categories } = useAppSelector(state => state.category)
    const selectedCategory = categories?.find(c => c.title === item?.categoryId)

    const borderWidth = useSharedValue(0)
    const reanimatedBackgroundColor = useSharedValue("#233142");


    useEffect(() => {
        if (item.isDone === "done") {
            borderWidth.value = withTiming(1)
            reanimatedBackgroundColor.value = withTiming("#ddd")
        } else {
            borderWidth.value = withTiming(0)
            reanimatedBackgroundColor.value = withTiming("#233142")
        }
    }, [item.isDone]);

    const animatedContainerStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(reanimatedBackgroundColor.value),
            // borderWidth: withTiming(borderWidth.value),
        };
    });


    const ofsetRef = useRef(0)
    const iconSize = useSharedValue(0);
    const isPressed = useSharedValue(false);
    const offset = useSharedValue(0);


    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: withSpring(offset.value) },
                { scale: withSpring(isPressed.value ? 1.02 : 1) },
            ],
        };
    });

    const iconStyle = useAnimatedStyle(() => {
        return ({
            opacity: withTiming(iconSize.value, { duration: 1000 })
        })
    })

    const start = useSharedValue(0);
    const gesture = Gesture.Pan()
        .onBegin((e) => {
            ofsetRef.current = e.absoluteX
            isPressed.value = true;
            iconSize.value = 1
        })
        .onUpdate((e) => {
            if (e.translationX < 0) {
                offset.value = e.translationX + 1
            } else {
                offset.value = e.translationX - 1
            }
        })
        .onEnd((e) => {
            start.value = offset.value
        })
        .onFinalize((e) => {
            isPressed.value = false;

            if (ofsetRef.current - e.translationX < 150) {
                // offset.value = e.translationX - 1
                offset.value = 0
                iconSize.value = 0
            } else {
                offset.value = -150
            }
        });


    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={{ position: "relative" }}>

                <Animated.View
                    entering={FadeInDown.springify().delay(index * 200)}
                    style={[
                        {
                            ...styles.container,
                            borderColor: item.isDone === "done" ? "#233142" : '#fff',
                            position: "relative",
                            zIndex: 1,
                        },
                        animatedContainerStyles,
                        animatedStyles
                    ]}
                >

                    <View
                        style={{
                            ...styles.coloredBar,
                            backgroundColor: item.isDone === "done" ? "gray" : selectedCategory?.color ? `${selectedCategory?.color?.slice(0, 7)}` : "gray",
                        }}
                    />

                    <TouchableOpacity
                        disabled={loading}
                        style={styles.infoContainer}
                        onPress={() => {
                            onPress && onPress()
                        }}
                    >
                        <Text
                            style={{
                                ...styles.tag,
                                color: item.isDone === "done" ? "gray" : selectedCategory?.color ? `${selectedCategory?.color?.slice(0, 7)}` : "gray",
                            }}
                        >
                            {selectedCategory?.title ?? "Deleted"} - {moment(item?.date).format("DD MMM YYYY")}
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


                    {
                        loading && (
                            <View
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: '#fff9'
                                }}
                            >
                                <ActivityIndicator />
                            </View>
                        )
                    }

                </Animated.View>

                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            paddingHorizontal: 20,
                            right: 20,
                            top: 20,
                            bottom: 20,
                            zIndex: -10,
                            backgroundColor: '#a006',
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10,
                        },
                        iconStyle
                    ]}
                >
                    <Ionicons
                        onPress={onDelete}
                        name="trash"
                        size={32}
                        color="#a00"
                    />
                </Animated.View>

            </Animated.View>
        </GestureDetector>
    )
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        borderRadius: 10,
        marginVertical: 8,
        flexDirection: 'row',
    },
    coloredBar: {
        width: 10,
        marginRight: 15,
        borderRadius: 5,
    },
    infoContainer: {
        flex: 1,
    },
    tag: {
        fontSize: 16,
    },
    itemTitle: {
        fontSize: 24,
    },
    date: {
        fontSize: 16,
    },
})