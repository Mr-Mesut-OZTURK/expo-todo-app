import { Avatar } from 'react-native-paper';
import React, { useCallback, useEffect, useState } from 'react'
import { NavigationProp } from '@react-navigation/native';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MainLayout } from '@/layouts';
import { ICategoryItem, ITodoItem } from '@/types';
import { SectionTitle, TodoItemCard } from '@/components';
import { deleteTodo, fetchCategories, fetchTodos, updateTodoCompletion } from '@/db';
import { setCategories, setTodos, updateTodo, useAppDispatch, useAppSelector } from '@/context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';



interface ScreenProps {
    navigation: NavigationProp<any | any>
}


export const HomeScreen = ({ navigation }: ScreenProps) => {

    const dispatch = useAppDispatch()
    const [userId, setUserId] = useState("")
    const [loading, setLoading] = useState<any>(false)
    const [filteredTodos, setFilteredTodos] = useState<Array<ITodoItem>>([])

    const { todos } = useAppSelector(state => state.todo)

    useEffect(() => {
        getUserId()
    }, []);


    useEffect(() => {
        if (userId) {
            refreshTodos();
            fetchCategories(userId, (array: Array<ICategoryItem>) => dispatch(setCategories(array)))
        }
    }, [userId]);


    useEffect(() => {
        setFilteredTodos(todos)
    }, [todos])


    const getUserId = async () => {
        const userId = await AsyncStorage.getItem('SIGNED');
        setUserId(userId ?? "")
    }

    const refreshTodos = () => {
        fetchTodos(userId, (array: any) => {
            dispatch(setTodos(array))
        });
    };

    const toggleTodoCompletion = async (id: string, completed: any) => {
        setLoading(id)
        await updateTodoCompletion(id, completed, () => {
            dispatch(updateTodo(id))
        });
        setLoading(false)
    };

    const removeTodo = (id: any) => {
        deleteTodo(id);
        refreshTodos();
    };



    return (
        <MainLayout style={{ padding: 20, }}>

            <View
                style={{
                    // padding: 20,
                    // paddingHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 30,
                    backgroundColor: '#f5edf9',
                    padding: 10,
                    paddingVertical: 20,
                    borderRadius: 10,
                }}
            >
                <Avatar.Icon icon="account" />
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        marginLeft: 10
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '600'
                        }}
                    >
                        Welcome User Name
                    </Text>
                    <Text>user@email.com</Text>
                </View>

                {/* <TouchableOpacity>
                    <Icon source="cog-outline" size={30} />
                </TouchableOpacity> */}
            </View>

            <FlatList
                scrollEnabled={false}
                ListHeaderComponent={
                    <SectionTitle
                        title='Things to do today'
                        // rightButton='All'
                        rightText='See All'
                        onPress={() => {
                            // setFilteredTodos(todos)
                            navigation.navigate('search')
                        }}
                    />
                }

                style={{
                    // width: Dimensions.get('screen').width,
                    // flex: 1,
                    // marginTop: 100,
                    // backgroundColor: 'green'
                }}
                contentContainerStyle={{
                    paddingBottom: 100
                }}

                data={filteredTodos}
                renderItem={({ item, index }: { item: ITodoItem, index: number }) => {

                    return (
                        <TodoItemCard
                            loading={loading == item.id}
                            item={item}
                            index={index}
                            onDelete={() => {
                                removeTodo(item?.id ?? null)
                            }}
                            onPress={() => {
                                const isCompleted = item.isDone !== "inprogress" ? "inprogress" : "done"
                                toggleTodoCompletion(item?.id ? `${item?.id}` : "", isCompleted)
                            }}
                        />
                    )
                }}
                keyExtractor={(item, index) => `${item}-${index}`}
                ListEmptyComponent={() => {
                    return (
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ textAlign: 'center' }}>
                                There is no todo!
                            </Text>
                        </View>
                    )
                }}
            />

        </MainLayout>
    )
}


const styles = StyleSheet.create({
    ball: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: 'blue',
        alignSelf: 'center',
    },
});