import { TodoItemCard } from '@/components';
import { delTodo, getTodos, useAppDispatch, useAppSelector } from '@/context';
import { MainLayout } from '@/layouts';
import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, FAB, Modal, Portal, TextInput } from 'react-native-paper';
import * as SQLite from 'expo-sqlite'
import { deleteTask, fetchTasks, todoTableInit, insertTask, updateTaskCompletion } from '@/db';
import { ITodoItem } from '@/types';

interface HomeScreenProps {
    navigation: NavigationProp<any | any>
}

// function openDatabase() {
//     if (Platform.OS === "web") {
//         return {
//             transaction: () => {
//                 return {
//                     executeSql: () => { },
//                 };
//             },
//         };
//     }

//     const db = SQLite.openDatabase("@/db/sqlite.db");
//     return db;
// }

export const HomeScreen = ({ navigation }: HomeScreenProps) => {

    const dispatch = useAppDispatch()
    const { todoList } = useAppSelector(state => state.todo)

    const [value, setValue] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        todoTableInit();
        refreshTasks();
    }, []);

    const refreshTasks = () => {
        fetchTasks(setTasks);
    };

    const toggleTaskCompletion = (id: SQLite.SQLStatementArg, completed: any) => {
        updateTaskCompletion(id, completed);
        refreshTasks();
    };

    const removeTask = (id: any) => {
        deleteTask(id);
        refreshTasks();
    };

    // const addTask = () => {
    //     if (value.trim().length === 0) return;
    //     insertTask(value, refreshTasks);
    //     setValue("")
    // };
    console.log({ tasks });

    return (
        <MainLayout>

            <View style={styles.container}>

                <View style={styles.upperContainer}>

                    <Image
                        style={styles.profileImage}
                        source={{ uri: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1483" }}
                    />
                    <View style={styles.upperInfoContainer}>

                        <Text style={styles.name}>Name Surname</Text>
                        <Text style={styles.email}>example@email.com</Text>
                    </View>

                </View>

                <View style={styles.todosContainer}>

                    <FlatList
                        data={tasks}
                        renderItem={({ item }: { item: ITodoItem }) => (
                            <TodoItemCard
                                item={item}
                                onLongPres={() => {
                                    // dispatch(delTodo(item))
                                    removeTask(item?.id ?? null)
                                }}
                                onPress={() => {
                                    // dispatch(delTodo(item))

                                    const isCompleted = item.isDone !== "inprogress" ? "inprogress" : "done"
                                    console.log({ isCompleted });
                                    toggleTaskCompletion(item?.id ?? null, isCompleted)
                                }}
                            />
                        )}
                        keyExtractor={(item, index) => `${item}-${index}`}
                    />



                    <FAB
                        icon="plus"
                        style={styles.fab}
                        onPress={() => {
                            navigation.navigate("main", {
                                screen: "todo-create"
                            })
                        }}
                    />


                    {/* 
                    <View style={styles.container}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter new task"
                                value={value}
                                onChangeText={setValue}
                            />
                            <Pressable onPress={addTask} style={styles.addButton}>
                                <Text style={styles.addButton}>+</Text>
                            </Pressable>
                        </View>
                        <FlatList
                            data={tasks}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }: { item: any }) => (
                                <View style={styles.listItem}>
                                    <Pressable
                                        onPress={() => toggleTaskCompletion(item?.id, item.completed)}
                                    >
                                        <Text
                                            style={{
                                                textDecorationLine: item.completed ? "line-through" : "none",
                                            }}
                                        >
                                            {item.value}
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => removeTask(item.id)}
                                        style={styles.deleteButton}
                                    >
                                        <Text style={styles.deleteButtonText}>Delete</Text>
                                    </Pressable>
                                </View>
                            )}
                        />
                    </View> */}

                </View>

            </View>

        </MainLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ecf5ff',
        flex: 1,
    },

    upperContainer: {
        backgroundColor: '#f1f1f1',
        padding: 20,
        paddingBottom: 70,
        flexDirection: 'row',

    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    upperInfoContainer: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 24,
        marginBottom: 5,
        fontWeight: '700'
    },
    email: {

    },
    todosContainer: {
        backgroundColor: '#393939',
        flex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: -50,

        paddingTop: 30,
    },


    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },


    // container: {
    //     flex: 1,
    //     marginTop: 30,
    //     backgroundColor: "#fff",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   },
    // inputContainer: {
    //     flexDirection: "row",
    //     paddingHorizontal: 12,
    //     marginBottom: 20,
    // },
    // addButton: {
    //     backgroundColor: "#007bff",
    //     width: 40,
    //     height: 40,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     borderRadius: 4,
    // },
    // input: {
    //     flex: 1,
    //     height: 40,
    //     borderColor: "gray",
    //     borderWidth: 1,
    //     marginRight: 10,
    //     paddingLeft: 10,
    // },
    // listItem: {
    //     flexDirection: "row",
    //     paddingHorizontal: 15,
    //     marginVertical: 8,
    //     alignItems: "center",
    //     justifyContent: "space-between",
    //     width: "100%",
    // },
    // deleteButton: {
    //     backgroundColor: "#B52C2C",
    //     padding: 10,
    //     borderRadius: 4,
    //     justifyContent: "center",
    //     alignItems: "center",
    // },
    // deleteButtonText: {
    //     color: "#ffffff",
    // },

})