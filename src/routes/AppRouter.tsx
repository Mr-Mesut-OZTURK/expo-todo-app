import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountScreen, HomeScreen } from '@/screens';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


export const AppRouter = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="home"


                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Ionicons
                                    name={focused ? 'home' : "home-outline"}
                                    size={14}
                                    color="orange"
                                />
                            )
                        },
                        title: "Yapılacaklar"
                    }}
                />
                <Tab.Screen
                    name="settings"
                    component={AccountScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Ionicons
                                    name={focused ? 'person' : "person-outline"}
                                    size={14}
                                    color="orange"
                                />
                            )
                        },
                        title: "Hesap"
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>

    )
}