import { FAB } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'

import { ICategoryItem, ITodoItem } from '@/types';
import { MainLayout } from '@/layouts';
import { CategoriesSection } from '@/sections';
import { SectionTitle, TodoItemCard } from '@/components';
import { setTodos, useAppDispatch, useAppSelector } from '@/context';
import { categoryTableInit, deleteTodo, fetchTodos, todoTableInit, updateTodoCompletion } from '@/db';
import { Ionicons } from '@expo/vector-icons';




interface ScreenProps {
    navigation: NavigationProp<any | any>
}


export const HomeScreen = ({ navigation }: ScreenProps) => {

    const dispatch = useAppDispatch()
    const [userId, setUserId] = useState("")
    const [filteredTodos, setFilteredTodos] = useState<Array<ITodoItem>>([])
    const todayBtnTheme = useRef({
        todayButtonTextColor: "red",
    });

    const { todos } = useAppSelector(state => state.todo)

    useEffect(() => {
        todoTableInit();
        categoryTableInit();
        getUserId()
    }, []);

    useEffect(() => {
        if (userId) {
            refreshTodos();
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

    const toggleTodoCompletion = (id: string, completed: any) => {
        updateTodoCompletion(id, completed);
        refreshTodos();
    };

    const removeTodo = (id: any) => {
        deleteTodo(id);
        refreshTodos();
    };

    const handleFilterByDate = ({ dateString }: any) => {
        const newList = todos?.filter((todo: ITodoItem) => todo.date === dateString)
        setFilteredTodos(newList)
    }

    const handleFilterByCategory = (category: ICategoryItem) => {
        console.log({ category });
        const newList = todos?.filter((todo: ITodoItem) => todo.categoryId === category.title)
        setFilteredTodos(newList)
    }

    return (
        <MainLayout>
            <View style={styles.container}>
                <CalendarProvider
                    date={Date()}
                    theme={todayBtnTheme.current}
                    showTodayButton
                    todayButtonStyle={{
                        bottom: 90,
                    }}
                >
                    <View style={{ height: 180, zIndex: 10 }}>
                        <ExpandableCalendar
                            onDayPress={handleFilterByDate}
                            firstDay={1}


                            renderArrow={(prop) => {
                                return (
                                    <Ionicons
                                        color="#de2820"
                                        size={24}
                                        name={prop === "left" ? 'arrow-back' : 'arrow-forward'}
                                    />
                                )
                            }}
                        />
                    </View>

                    <ScrollView style={styles.todosContainer} >

                        <CategoriesSection
                            navigation={navigation}
                            handleFilterByCategory={handleFilterByCategory}
                        />



                        <ScrollView horizontal style={{ flex: 1 }} scrollEnabled={false}>
                            <FlatList
                                scrollEnabled={false}
                                ListHeaderComponent={
                                    <SectionTitle
                                        title='Todos'
                                        rightButton='All'
                                        onPress={() => {
                                            setFilteredTodos(todos)
                                        }}
                                    />
                                }
                                style={{
                                    width: Dimensions.get('screen').width,
                                    flex: 1,
                                    // marginTop: 100,
                                    // backgroundColor: 'green'
                                }}
                                contentContainerStyle={{
                                    paddingBottom: 100
                                }}

                                data={filteredTodos}
                                renderItem={({ item }: { item: ITodoItem }) => (
                                    <TodoItemCard
                                        item={item}
                                        onLongPres={() => {
                                            removeTodo(item?.id ?? null)
                                        }}
                                        onPress={() => {
                                            const isCompleted = item.isDone !== "inprogress" ? "inprogress" : "done"
                                            toggleTodoCompletion(item?.id ? `${item?.id}` : "", isCompleted)
                                        }}
                                    />
                                )}
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



                        </ScrollView>

                    </ScrollView>

                    <FAB
                        icon="plus"
                        color='#fff'
                        style={styles.fab}

                        onPress={() => {
                            navigation.navigate("main", {
                                screen: "todo-create"
                            })
                        }}
                    />

                </CalendarProvider>
            </View>
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ecf5ff',
        flex: 1,
    },

    todosContainer: {
        flex: 1,
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#de2820',
        color: '#fff'
    },

})