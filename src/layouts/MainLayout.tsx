import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'


interface MainLayoutProps {
  children: React.ReactNode
}


export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SafeAreaView style={styles.container}>
      {children}
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})