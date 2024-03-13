import { TodoItemCard } from '@/components';
import { MainLayout } from '@/layouts';
import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, FAB, Modal, Portal, TextInput } from 'react-native-paper';

interface HomeScreenProps {
    navigation: NavigationProp<any | any>
}

export const HomeScreen = ({ navigation }: HomeScreenProps) => {

    const [text, setText] = useState("");
    const [list, setList] = useState([
        "Kitap oku!",
    ])


    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


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
                        data={list}
                        renderItem={({ item }) => (
                            <TodoItemCard
                                item={{ title: item }}
                                onLongPres={() => {
                                    const newList = list.filter(i => i !== item)
                                    setList(newList)
                                }}
                            />
                        )}
                        keyExtractor={(item, index) => `${item}-${index}`}
                    />

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
                                    setList((prev) => ([...prev, text]))
                                    setText("")
                                    hideModal()
                                }}
                            >
                                Ekle
                            </Button>
                        </Modal>
                    </Portal>

                    <FAB
                        icon="plus"
                        style={styles.fab}
                        onPress={() => {
                            navigation.navigate("stackRouter", {
                                screen: "create-todo"
                            })
                        }}
                    />
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

    modal: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },

})