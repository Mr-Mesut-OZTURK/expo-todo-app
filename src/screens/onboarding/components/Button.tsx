import {
    Pressable,
    StyleSheet,
} from 'react-native';
import React, { useCallback } from 'react';
import Animated, {
    withSpring,
    withTiming,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { insertKeyvalue } from '@/db';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';

type Props = {
    currentIndex: Animated.SharedValue<number>;
    length: number;
    flatListRef: any;
    navigation: NavigationProp<any | any>
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button = ({ currentIndex, length, flatListRef, navigation }: Props) => {

    const rnBtnStyle = useAnimatedStyle(() => {
        return {
            width:
                currentIndex.value === length - 1 ? withSpring(140) : withSpring(60),
            height: 60,
        };
    }, [currentIndex, length]);

    const rnTextStyle = useAnimatedStyle(() => {
        return {
            opacity:
                currentIndex.value === length - 1 ? withTiming(1) : withTiming(0),
            transform: [
                {
                    translateX:
                        currentIndex.value === length - 1 ? withTiming(0) : withTiming(100),
                },
            ],
        };
    }, [currentIndex, length]);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity:
                currentIndex.value !== length - 1 ? withTiming(1) : withTiming(0),
            transform: [
                {
                    translateX:
                        currentIndex.value !== length - 1 ? withTiming(0) : withTiming(100),
                },
            ],
        };
    }, [currentIndex, length]);

    const onPress = useCallback(async () => {
        if (currentIndex.value === length - 1) {
            await AsyncStorage.setItem('ONBOARDED', 'true');
            const signed = await AsyncStorage.getItem('SIGNED');

            navigation.navigate(signed === "true" ? 'main' : 'auth');
            return;
        } else {
            flatListRef?.current?.scrollToIndex({
                index: currentIndex.value + 1,
            });
        }
    }, []);



    return (
        <AnimatedPressable style={[styles.container, rnBtnStyle]} onPress={onPress}>
            <Animated.Text style={[styles.textStyle, rnTextStyle]}>
                Get Started
            </Animated.Text>
            <Animated.Image
                source={require('@/assets/images/right-arrow.png')}
                style={[styles.imageStyle, imageAnimatedStyle]}
            />
        </AnimatedPressable>
    );
};



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 100,
        backgroundColor: '#304FFE',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    textStyle: {
        color: 'white',
        position: 'absolute',
        fontWeight: '600',
        fontSize: 16,
    },
    imageStyle: {
        width: 24,
        height: 24,
        position: 'absolute',
    },
});