import { Asset } from 'expo-asset';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { SQLiteProvider } from "expo-sqlite/next";
import React, { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';

import { store } from '@/context';
import { theme } from '@/providers';
import { AppRouter } from '@/routes';
import { SplashScreen } from '@/screens';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-toast-message';

import { useFonts } from 'expo-font';



export default function App() {

  const [loaded] = useFonts({
    Ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
  });

  if (!loaded) {
    return null;
  }


  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <React.Suspense fallback={<SplashScreen />}>
          <SQLiteProvider databaseName="mySQLiteDB.db" useSuspense>
            <RootSiblingParent>

              <StatusBar />
              <AppRouter />
              <Toast />

            </RootSiblingParent>
          </SQLiteProvider>
        </React.Suspense>
      </PaperProvider>
    </Provider>
  );
}
