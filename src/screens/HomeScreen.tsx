import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, FAB, Modal, Portal, TextInput } from 'react-native-paper';


export const HomeScreen = () => {

    const [text, setText] = useState("");
    const [list, setList] = useState([
        "Kitap oku!",
    ])


    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const Item = ({ title }: any) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onLongPress={() => {
                const newList = list.filter(item => item !== title)
                setList(newList)
            }}
        >
            <Text style={styles.itemTitle}>
                {title}
            </Text>
        </TouchableOpacity>
    );

    return (
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
                    renderItem={({ item }) => <Item title={item} />}
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
                    onPress={showModal}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
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
        backgroundColor: 'blue',
        flex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: -50,

        paddingTop: 30,
    },
    itemContainer: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    itemTitle: {
        fontSize: 32,
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