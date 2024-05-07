import React, { useEffect } from 'react'
import { Loading } from '@/components';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { categoryTableInit, todoTableInit } from '@/db';


interface MainLayoutProps {
  children: React.ReactNode;
  loading?: boolean;
  style?: any;
}


export const MainLayout = ({ children, loading, style }: MainLayoutProps) => {

  useEffect(() => {
    todoTableInit();
    categoryTableInit();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>

        <View style={[styles.innerContainer, style]}>

          {children}
          {loading && <Loading loading={loading} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ecf5ff',
    backgroundColor: '#fff'
  },

  scrollView: {
    // flex: 1,
    // justifyContent: 'center',
    // backgroundColor: 'red',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    // padding: 20,
    // paddingTop: 100,
    // paddingBottom: 100,
    minHeight: Dimensions.get('screen').height - 90
  },

})