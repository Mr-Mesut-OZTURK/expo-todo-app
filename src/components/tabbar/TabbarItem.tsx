import React, { useEffect } from 'react'
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated';
import { useNavigation, useNavigationState } from '@react-navigation/native';


export interface ITabbarItem {
    item: {
        id: string;
        title: string;
        icon: any;
        link: any;
    }

    isActive?: boolean;
}

export const TabbarItem = ({ item, isActive }: ITabbarItem) => {

    const navigation = useNavigation<any>()
    const theme = useTheme()
    const animatedBorderWidth = useSharedValue(0);
    const translateY = useSharedValue(0);
    const fontSize = useSharedValue(0);

    const state = useNavigationState(state => state)


    useEffect(() => {
        if (isActive) {
            animatedBorderWidth.value = withTiming(4)
            translateY.value = withSpring(-30)
            fontSize.value = withSpring(18)
        } else {
            animatedBorderWidth.value = withTiming(0)
            translateY.value = withSpring(0)
            fontSize.value = withSpring(0)
        }
    }, [isActive]);


    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(item.link)
            }}

            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 20,
                // backgroundColor: 'red',
            }}
        >

            <Animated.View
                style={{
                    // borderWidth: rootSegment.join('/') === item.link ? 5 : 0,
                    borderColor: '#fff',
                    backgroundColor: theme.colors?.secondary,
                    borderWidth: animatedBorderWidth,
                    borderRadius: 50,
                    padding: 10,
                    // backgroundColor: rootSegment.join('/') === item.link ? theme.colors.primary : '',
                    transform: [{ translateY }]

                }}

            >
                <Ionicons
                    // color={!isActive ? theme.colors.primary : '#fff'}
                    color={!isActive ? '#2196f3' : '#fff'}
                    name={item.icon}
                    size={32}
                />
            </Animated.View>


            <Animated.Text
                style={{
                    color: '#fff',
                    fontSize: fontSize,
                    transform: [{ translateY }],
                    marginTop: 5,
                    display: isActive ? 'flex' : 'none'

                }}
            >
                {item.title}
            </Animated.Text>

        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

})