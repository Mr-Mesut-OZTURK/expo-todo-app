import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import { AccountScreen, CreateUpdateTodoScreen, HomeScreen, TodoDetailScreen, CategoriesScreen, SearchTodoScreen } from '@/screens';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { TabbarItem } from '@/components';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigationState } from '@react-navigation/native';
import { useState } from 'react';




const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator()

export interface ITabbarItem {
    id: string;
    title: string;
    icon: any;
    link: string;
}

const TabRouter = () => {

    const BottomTabs: Array<ITabbarItem> = [
        {
            id: "home",
            title: "Home",
            icon: "home",
            link: 'home'
        },
        {
            id: "add",
            title: "Add New",
            icon: "add",
            link: 'search'
        },
        {
            id: "settings",
            title: "Settings",
            // icon: "settings",
            icon: "settings",
            link: 'settings'
        },
    ]

    const theme = useTheme()

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}

            tabBar={({ state }) => {
                return (
                    <Animated.View
                        entering={FadeInDown.delay(200)}
                        style={{
                            backgroundColor: theme.colors.secondary,

                            position: 'absolute',
                            bottom: 30,
                            left: 20,
                            right: 20,
                            borderRadius: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            // overflow: 'hidden',
                            // padding: 2,
                            height: 60,

                            shadowColor: "#000",
                            shadowOffset: {
                                width: -5,
                                height: 12,
                            },
                            shadowOpacity: 0.58,
                            shadowRadius: 16.00,

                            elevation: 24,
                        }}
                    >

                        {
                            BottomTabs?.map((item, index) => {

                                return (
                                    <TabbarItem
                                        key={index}
                                        item={item}
                                        isActive={index === state.index}
                                    // onPress={() => setSelectedTab(index)}
                                    />
                                )
                            })
                        }

                    </Animated.View>
                )
            }}

        >
            <Tab.Screen name="home" component={HomeScreen} />
            <Tab.Screen name="search" component={SearchTodoScreen} />
            <Tab.Screen name="settings" component={AccountScreen} />

            {/* <Tab.Screen
                name="home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons
                                name={focused ? 'home' : "home-outline"}
                                size={24}
                                color="#de2820"
                            />
                        )
                    },
                    title: "",

                }}
            /> */}

        </Tab.Navigator>
    )
}


export const MainRouter = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false, }}>

            <Stack.Screen name="tabScreens" component={TabRouter} />
            <Stack.Screen name="todo-create" component={CreateUpdateTodoScreen} />
            <Stack.Screen name="todo-detail" component={TodoDetailScreen} />
            <Stack.Screen name="categories" component={CategoriesScreen} />

        </Stack.Navigator>
    )
}