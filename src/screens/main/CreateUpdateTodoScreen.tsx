import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MainLayout } from '@/layouts'
import { Button, FAB, Modal, Portal, TextInput } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Calendar } from 'react-native-calendars';
import { addTodo, useAppDispatch } from '@/context';
import { todoTableInit, insertTask, fetchTasks } from '@/db';


interface ICreateUpdateTodoScreenProps {
    navigation: NavigationProp<any | any>
}

export const CreateUpdateTodoScreen = ({ navigation }: ICreateUpdateTodoScreenProps) => {

    const dispatch = useAppDispatch()
    const [text, setText] = useState("");
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date().toDateString());

    useEffect(() => {
        todoTableInit();
        // refreshTasks();
    }, []);


    const handleAddTodo = () => {
        // dispatch(addTodo({
        //     title,
        //     description,
        //     date,
        // }))
        insertTask({ title, description, date }, () => fetchTasks(navigation.goBack))

    }

    return (
        <MainLayout>
            <ScrollView style={styles.container}>

                <TouchableOpacity
                    style={styles.backContainer}
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Ionicons
                        name="arrow-back"
                        size={40}
                        color="orange"
                    />

                    <Text style={{ fontSize: 24, fontWeight: '800', marginLeft: 10, color: '#393939' }}>
                        Geri
                    </Text>
                </TouchableOpacity>

                <View style={styles.formContainer}>
                    <Text
                        style={{
                            fontSize: 24,
                            color: '#fff',
                            marginBottom: 20,
                        }}
                    >
                        Yapılacak İşi Oluştur
                    </Text>

                    <TextInput
                        label="İsim"
                        mode='outlined'
                        style={{
                            marginBottom: 10,
                            marginTop: 10,
                        }}
                        value={title}
                        onChange={(e) => {
                            // console.log({ e: e.nativeEvent.text })
                            setTitle(e.nativeEvent.text)
                        }}
                    />

                    <TextInput
                        mode='outlined'
                        label="Açıklama"
                        multiline
                        numberOfLines={4}
                        style={{
                            marginBottom: 20,
                        }}
                        value={description}
                        onChange={(e) => {
                            // console.log({ e: e.nativeEvent.text })
                            setDescription(e.nativeEvent.text)
                        }}
                    />

                    <Calendar
                        // minDate={Date.now().toString()}
                        style={{
                            borderRadius: 10,
                            marginBottom: 20,
                        }}
                        initialDate={date}
                        markedDates={{
                            [date]: { selected: true, marked: false, selectedColor: 'purple' },
                            // '2024-03-16': { selected: true, marked: true, selectedColor: 'blue' },
                            // '2024-03-17': { marked: true },
                            // '2024-03-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
                            // '2024-03-19': { disabled: true, disableTouchEvent: true }
                        }}
                        onDayPress={(value) => {
                            console.log({ value: value.dateString });
                            setDate(value.dateString)
                        }}
                    />

                    <Button
                        mode='contained'
                        style={{
                            borderRadius: 10,
                        }}
                        onPress={() => {
                            // console.log("object");
                            handleAddTodo()
                        }}
                    >
                        Oluştur
                    </Button>

                </View>




                <Portal>
                    <Modal
                        visible={visible}
                        onDismiss={hideModal}
                        contentContainerStyle={styles.modal}
                    >
                        <Text>Yapılacak işi giriniz.</Text>
                        <TextInput
                            label="İş"
                            value={text}
                            onChangeText={text => setText(text)}
                            style={{
                                marginBottom: 10,
                                marginTop: 10,
                            }}
                        />
                        <Button
                            icon="pencil"
                            mode="contained"
                            onPress={() => {
                                // setList((prev) => ([...prev, text]))
                                setText("")
                                hideModal()
                            }}
                        >
                            Ekle
                        </Button>
                    </Modal>
                </Portal>

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
    backContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    formContainer: {
        backgroundColor: '#393939',
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