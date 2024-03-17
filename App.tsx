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




const loadDatabase = async () => {
  const dbName = "mySQLiteDB.db";
  const dbAsset = require("./assets/mySQLiteDB.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};


export default function App() {

  const [dbLoaded, setDbLoaded] = useState<boolean>(false);

  useEffect(() => {
    loadDatabase()
      .then(() => {
        setTimeout(() => {
          setDbLoaded(true)
        }, 500)
      })
      .catch((e) => console.error(e));
  }, []);

  if (!dbLoaded) return null // <SplashScreen />


  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <React.Suspense fallback={<SplashScreen />}>
          <SQLiteProvider databaseName="mySQLiteDB.db" useSuspense>

            <StatusBar />
            <AppRouter />

          </SQLiteProvider>
        </React.Suspense>
      </PaperProvider>
    </Provider>
  );
}
