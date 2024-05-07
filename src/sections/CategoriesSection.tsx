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
    handleFilterByCategory: (e: any) => any;
    categories: Array<ICategoryItem>
}


export const CategoriesSection = ({ navigation, handleFilterByCategory, categories }: SectionProps) => {



    return (
        <View>

            <SectionTitle
                title='Categories'
                rightText='See All'
                onPress={() => {
                    navigation.navigate("main", { screen: 'categories' })
                }}
            />

            <ScrollView
                horizontal
                style={{ marginBottom: 20, marginTop: 10 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
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