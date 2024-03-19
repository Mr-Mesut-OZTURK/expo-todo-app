import React, { useEffect, useState } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { fetchCategories } from '@/db'
import { ICategoryItem } from '@/types'
import { CategoryItemCard, SectionTitle } from '@/components'
import { setCategories, useAppDispatch, useAppSelector } from '@/context'


interface SectionProps {
    navigation: NavigationProp<any>,
    handleFilterByCategory: (e: any) => any
}


export const CategoriesSection = ({ navigation, handleFilterByCategory }: SectionProps) => {

    const dispatch = useAppDispatch()
    const [userId, setUserId] = useState("")
    const { categories } = useAppSelector(state => state.category)

    useEffect(() => {
        getUserId()
    }, []);

    useEffect(() => {
        if (userId) {
            fetchCategories(userId, (array: Array<ICategoryItem>) => dispatch(setCategories(array)))
        }
    }, [userId]);

    const getUserId = async () => {
        const userId = await AsyncStorage.getItem('SIGNED');
        setUserId(JSON.parse(userId ?? ""))
    }

    return (
        <View>

            <SectionTitle
                title='Categories'
                rightText='See All'
                onPress={() => {
                    navigation.navigate("main", { screen: 'categories' })
                }}
            />

            <ScrollView horizontal style={{ marginBottom: 20, marginTop: 10 }}>
                {
                    categories?.map((item, index) => {
                        return (
                            <CategoryItemCard
                                key={index}
                                item={item}
                                onPress={handleFilterByCategory}
                            />
                        )
                    })
                }
            </ScrollView>

            {
                categories?.length === 0 ? (
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ textAlign: 'center' }}>
                            There is no category!
                        </Text>
                    </View>
                ) : null
            }

        </View>
    )
}


const styles = StyleSheet.create({})