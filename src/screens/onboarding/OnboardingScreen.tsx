import { useCallback, useEffect } from 'react';
import {
  View,
  ViewToken,
  StyleSheet,
  SafeAreaView,
  ImageURISource,
} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { ListItem, PaginationElement, Button } from './components';
import { NavigationProp } from '@react-navigation/native';




const pages = [
  {
    text: 'Your information is stored only on your phone.',
    image: require('../../assets/images/trust.png'),
  },
  {
    text: 'We will try to make it as completely free and ad-free as possible.',
    image: require('../../assets/images/no-money.png'),
  },
  {
    text: 'Your time is valuable to us. Enjoy the application.',
    image: require('../../assets/images/save-time.png'),
  },
];

interface OnboardingScreenProps {
  navigation: NavigationProp<any | any>
}

export const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {


  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const flatListRef = useAnimatedRef<
    Animated.FlatList<{
      text: string;
      image: ImageURISource;
    }>
  >();



  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      flatListIndex.value = viewableItems[0].index ?? 0;
    },
    []
  );
  const scrollHandle = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({
      item,
      index,
    }: {
      item: { text: string; image: ImageURISource };
      index: number;
    }) => {
      return <ListItem item={item} index={index} x={x} />;
    },
    [x]
  );
  return (
    <SafeAreaView style={styles.container}>

      <Animated.FlatList
        ref={flatListRef}
        onScroll={scrollHandle}
        horizontal
        scrollEventThrottle={16}
        pagingEnabled={true}
        data={pages}
        keyExtractor={(_, index) => index.toString()}
        bounces={false}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      <View style={styles.bottomContainer}>
        <PaginationElement length={pages.length} x={x} />
        <Button
          navigation={navigation}
          currentIndex={flatListIndex}
          length={pages.length}
          flatListRef={flatListRef}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});