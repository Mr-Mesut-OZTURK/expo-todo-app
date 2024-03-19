import Toast from 'react-native-toast-message'
import React, { useEffect, useState } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Modal, Portal, TextInput } from 'react-native-paper'
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';

import { MainLayout } from '@/layouts'
import { ICategoryItem } from '@/types'
import { CategoryItemCard, GoBackButton, SectionTitle } from '@/components'
import { setCategories, useAppDispatch, useAppSelector } from '@/context'
import { deleteCategory, fetchCategories, insertCategory, updateCategory } from '@/db'



interface ScreenProps {
    navigation: NavigationProp<any | any>
}


export const CategoriesScreen = ({ navigation }: ScreenProps) => {

    const dispatch = useAppDispatch()
    const [title, setTitle] = useState("")
    const [color, setColor] = useState("")
    const [userId, setUserId] = useState("")
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [visible, setVisible] = useState(false);
    const { categories } = useAppSelector(state => state.category)


    useEffect(() => {
        getUserId()
    }, []);

    useEffect(() => {
        if (userId) {
            refreshCategories();
        }
    }, [userId]);


    const getUserId = async () => {
        const userId = await AsyncStorage.getItem('SIGNED');
        setUserId(userId ?? "")
    }

    const refreshCategories = () => {
        fetchCategories(userId, (array: Array<ICategoryItem>) => dispatch(setCategories(array)))
    };

    const update = (id: any, completed: any) => {
        updateCategory(id, { title, color, userId });
        refreshCategories();
    };

    const remove = (id: any) => {
        deleteCategory(id, () => {
            Toast.show({
                type: 'success',
                text1: 'Hello',
                text2: 'Successfully deleted category 👋'
            })

            setTimeout(() => {
                refreshCategories();
            }, 500)
        });

    };

    const handleSubmit = () => {

        if (title.trim().length === 0 || color.trim().length === 0) {
            Toast.show({
                type: 'info',
                text1: 'Alert',
                text2: `Please enter ${!title ? "title" : ""} ${!color ? "color" : ""}`
            })
            return;
        }

        insertCategory({ title, color, userId }, () => {
            Toast.show({
                type: 'success',
                text1: 'Hello',
                text2: 'Successfully added category 👋'
            })
            setTimeout(() => {
                refreshCategories();
            }, 500)

        });
        setTitle("")
        setVisible(false)

    };


    return (
        <MainLayout>
            <View style={styles.container}>

                <View style={styles.titleContainer}>
                    <GoBackButton
                        text='Geri'
                        onPress={() => {
                            navigation.goBack()
                        }}
                    />

                    <Button
                        mode='contained'
                        style={styles.addButton}
                        onPress={showModal}
                    >
                        Add New
                    </Button>
                </View>

                <SectionTitle
                    title='Categories'
                // rightButton='Add New'
                // onPress={() => {
                //     showModal()
                // }}
                />

                <FlatList
                    data={categories}
                    style={{
                        marginTop: 10,
                    }}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderItem={({ item }) => {
                        return (
                            <CategoryItemCard
                                item={item}
                                onDelete={() => {
                                    remove(item?.id);
                                }}
                            />
                        )
                    }}
                    ListEmptyComponent={() => {
                        return (
                            <Text>Herhangi bir categori bulunamadı!</Text>
                        )
                    }}
                />

                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>

                        <ScrollView>
                            <Text style={styles.title}>
                                Create Category.
                            </Text>

                            <TextInput
                                mode='outlined'
                                label="Title"
                                maxLength={20}
                                style={{
                                    marginBottom: 10,
                                    marginTop: 10,
                                    borderRadius: 0,
                                }}
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.nativeEvent.text)
                                }}
                            />

                            <View >
                                <Text
                                    style={{
                                        fontSize: 22,
                                        marginBottom: 5,
                                        marginTop: 10,
                                        fontWeight: '700'
                                    }}
                                >
                                    Color
                                </Text>
                                <ColorPicker style={{}} value='red'
                                    onComplete={(param) => {
                                        setColor(param.hex);
                                    }}
                                >
                                    <Preview
                                        style={{ marginBottom: 10 }}
                                        hideInitialColor
                                        hideText
                                    />
                                    {/* <Panel1 style={{ marginBottom: 10 }} /> */}
                                    {/* <HueSlider style={{ marginBottom: 10 }} /> */}
                                    {/* <OpacitySlider style={{ marginBottom: 10 }} /> */}
                                    <Swatches style={{ marginBottom: 10 }} />
                                </ColorPicker>
                            </View>

                            <Button
                                mode='contained'
                                style={{
                                    borderRadius: 5,
                                    marginBottom: 10,
                                    marginTop: 10,
                                    // padding: 8
                                }}
                                buttonColor='#de2820'
                                onPress={() => {
                                    handleSubmit()
                                }}
                                disabled={!title || !color}
                            >
                                Create Category
                            </Button>
                        </ScrollView>

                    </Modal>
                </Portal>

            </View>
        </MainLayout>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 30,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontWeight: '700',
        fontSize: 24,
        marginBottom: 20
    },
    addButton: {
        borderRadius: 5,
        backgroundColor: '#de2820',
    },

    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 40,
    }
})