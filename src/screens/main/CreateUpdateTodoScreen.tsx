import Toast from 'react-native-toast-message';
import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-native-calendars';
import { Button, TextInput } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MainLayout } from '@/layouts'
import { ICategoryItem } from '@/types';
import { GoBackButton } from '@/components';
import { todoTableInit, insertTodo, fetchTodos } from '@/db';
import { setTodos, useAppDispatch, useAppSelector } from '@/context';
import { Ionicons } from '@expo/vector-icons';


interface ICreateUpdateTodoScreenProps {
    navigation: NavigationProp<any | any>
}

export const CreateUpdateTodoScreen = ({ navigation }: ICreateUpdateTodoScreenProps) => {

    const dispatch = useAppDispatch()

    const [title, setTitle] = useState("");
    const [userId, setUserId] = useState("")
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date().toDateString());
    const { categories } = useAppSelector(state => state.category)


    useEffect(() => {
        todoTableInit();
        // todoTableAlter()
        // refreshTodos();
    }, []);

    useEffect(() => {
        getUserId()
    }, []);

    const getUserId = async () => {
        const userId = await AsyncStorage.getItem('SIGNED');
        setUserId(userId ?? "")
    }

    const handleAddTodo = () => {

        insertTodo(
            {
                title,
                description,
                date,
                userId,
                categoryId: category,
            },
            () => {

                Toast.show({
                    type: 'success',
                    text1: 'Todo',
                    text2: 'Successfully added todo 👋'
                })
                setTimeout(() => {
                    fetchTodos(
                        userId,
                        (array: Array<ICategoryItem>) => {
                            dispatch(setTodos(array))
                            navigation.goBack()
                        }
                    )
                }, 500)

            }
        )

    }

    return (
        <MainLayout>
            <ScrollView style={styles.container}>

                <GoBackButton
                    text='Geri'
                    onPress={() => {
                        navigation.goBack()
                    }}
                />

                <View style={styles.formContainer}>
                    <Text
                        style={{
                            fontSize: 32,
                            // color: '#333',
                            fontWeight: '700',
                            marginBottom: 20,
                            textAlign: 'center',
                            backgroundColor: '#de2820',
                            paddingVertical: 15,
                            color: '#fff',
                        }}
                    >
                        Create Todo
                    </Text>

                    <SelectList

                        setSelected={(val: any) => {
                            setCategory(val)
                            console.log({ val });
                        }}
                        data={categories.map((item: ICategoryItem) => ({ key: item.id, value: item.title }))}
                        save="value"
                        placeholder='Select Category'

                        boxStyles={{
                            borderRadius: 3,
                            backgroundColor: '#fffbfe',
                            marginBottom: 8,
                        }}

                        dropdownStyles={{
                            borderRadius: 3,
                            backgroundColor: '#fffbfe',
                            top: 0,
                            marginTop: -5,
                        }}
                    />

                    <TextInput
                        label="Title"
                        mode='outlined'
                        style={{
                            marginBottom: 10,
                        }}
                        value={title}
                        onChange={(e) => {
                            setTitle(e.nativeEvent.text)
                        }}
                    />



                    <TextInput
                        mode='outlined'
                        label="Description"
                        multiline
                        numberOfLines={4}
                        style={{
                            marginBottom: 20,
                            // ...(Platform.OS === "ios" && { paddingBottom: 100 })
                        }}
                        value={description}
                        onChange={(e) => {
                            setDescription(e.nativeEvent.text)
                        }}
                    />

                    <Calendar
                        // minDate={Date.now().toString()}
                        style={{
                            borderRadius: 10,
                            marginBottom: 20,
                            borderColor: '#777',
                            borderWidth: 1,
                        }}
                        initialDate={date}
                        markedDates={{
                            [date]: { selected: true, marked: false, selectedColor: '#de2820' },
                            // '2024-03-16': { selected: true, marked: true, selectedColor: 'blue' },
                            // '2024-03-17': { marked: true },
                            // '2024-03-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
                            // '2024-03-19': { disabled: true, disableTouchEvent: true }
                        }}
                        onDayPress={(value) => {
                            setDate(value.dateString)
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

                    <Button
                        mode='contained'
                        style={{
                            borderRadius: 5,
                            // backgroundColor: '#de2820',
                        }}
                        buttonColor='#de2820'
                        onPress={() => {
                            handleAddTodo()
                        }}
                        disabled={!category || !title || !description || !date}
                    >
                        Create Todo
                    </Button>

                </View>

            </ScrollView>
        </MainLayout>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingBottom: 50,
    },


    formContainer: {
        // backgroundColor: '#393939',
        flex: 1,
        marginBottom: 50,
        padding: 20,
        borderRadius: 10,
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
    },


})