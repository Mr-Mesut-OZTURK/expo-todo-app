import moment from 'moment';
import { FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CalendarProvider, ExpandableCalendar, } from 'react-native-calendars';
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'

import { ICategoryItem, ITodoItem } from '@/types';
import { MainLayout } from '@/layouts';
import { CategoriesSection } from '@/sections';
import { Loading, SectionTitle, TodoItemCard } from '@/components';
import { setCategories, setTodos, updateTodo, useAppDispatch, useAppSelector } from '@/context';
import { categoryTableInit, deleteTodo, fetchCategories, fetchTodos, todoTableInit, updateTodoCompletion } from '@/db';




interface ScreenProps {
    navigation: NavigationProp<any | any>
}


export const SearchTodoScreen = ({ navigation }: ScreenProps) => {

    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState<any>(false)
    const [userId, setUserId] = useState("")
    const [date, setDate] = useState(moment(Date.now()).format("YYYY-MM-DD"));
    const [filteredTodos, setFilteredTodos] = useState<Array<ITodoItem>>([])
    const todayBtnTheme = useRef({
        todayButtonTextColor: "red",
        backgroundColor: '#ecf5ff'
    });

    const { todos } = useAppSelector(state => state.todo)

    useEffect(() => {
        todoTableInit();
        categoryTableInit();
        getUserId()
    }, []);

    const { categories } = useAppSelector(state => state.category)

    useEffect(() => {
        getUserId()
    }, []);

    useEffect(() => {
        if (userId) {
            fetchCategories(userId, (array: Array<ICategoryItem>) => dispatch(setCategories(array)))
        }
    }, [userId]);



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

    const toggleTodoCompletion = async (id: string, completed: any) => {
        setLoading(id)
        await updateTodoCompletion(id, completed, () => {
            dispatch(updateTodo(id))
        });
        setLoading(false)
        // refreshTodos();
    };

    const removeTodo = (id: any) => {
        deleteTodo(id);
        refreshTodos();
    };

    const handleFilterByDate = ({ dateString }: any) => {
        setDate(dateString)
        const newList = todos?.filter((todo: ITodoItem) => todo.date === dateString)
        setFilteredTodos(newList)
    }

    const handleFilterByCategory = (category: ICategoryItem) => {
        console.log({ category });
        const newList = todos?.filter((todo: ITodoItem) => todo.categoryId === category.title)
        setFilteredTodos(newList)
    }

    return (
        <MainLayout loading={false}>
            <View style={styles.container}>
                <CalendarProvider
                    date={date}
                    theme={todayBtnTheme.current}
                    showTodayButton={date !== moment(Date.now()).format("YYYY-MM-DD")}
                    todayButtonStyle={{
                        // bottom: -40,
                    }}
                >
                    <View style={{ height: 180, zIndex: 10 }}>
                        <ExpandableCalendar
                            onDayPress={handleFilterByDate}
                            firstDay={1}
                            initialDate={date}
                            theme={{
                                selectedDayBackgroundColor: '#de2820',
                            }}



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

                    <ScrollView
                        style={styles.todosContainer}
                        showsVerticalScrollIndicator={false}
                    >

                        <CategoriesSection
                            categories={categories}
                            navigation={navigation}
                            handleFilterByCategory={handleFilterByCategory}
                        />

                        <ScrollView horizontal style={{ flex: 1 }} scrollEnabled={false}>
                            <FlatList
                                scrollEnabled={false}
                                ListHeaderComponent={
                                    <SectionTitle
                                        title='Todos'
                                        rightButton='+'
                                        onPress={() => {
                                            // setFilteredTodos(todos)
                                            navigation.navigate("main", {
                                                screen: "todo-create"
                                            })
                                        }}
                                    />
                                }
                                style={{
                                    width: Dimensions.get('screen').width,
                                    flex: 1,
                                    paddingHorizontal: 20
                                    // marginTop: 100,
                                    // backgroundColor: 'green'
                                }}
                                contentContainerStyle={{
                                    paddingBottom: 100
                                }}

                                data={filteredTodos}
                                renderItem={({ item, index }: { item: ITodoItem, index: number }) => (
                                    <TodoItemCard
                                        loading={loading == item.id}
                                        index={index}
                                        item={item}
                                        onDelete={() => {
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

                </CalendarProvider>
            </View>

        </MainLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#ecf5ff',
        backgroundColor: '#fff',

        flex: 1,
    },

    todosContainer: {
        flex: 1,
        // padding: 20
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#de2820',
        color: '#fff',
        borderRadius: 50,
    },

})