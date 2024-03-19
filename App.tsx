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


// const loadDatabase = async () => {
//   const dbName = "expo-todo-app-1.db";
//   const dbAsset = require("./assets/expo-todo-app-1.db");
//   const dbUri = Asset.fromModule(dbAsset).uri;
//   const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

//   const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
//   if (!fileInfo.exists) {
//     await FileSystem.makeDirectoryAsync(
//       `${FileSystem.documentDirectory}SQLite`,
//       { intermediates: true }
//     );
//     await FileSystem.downloadAsync(dbUri, dbFilePath);
//   }
// };


export default function App() {

  // const [dbLoaded, setDbLoaded] = useState<boolean>(false);
  const [loaded] = useFonts({
    Ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
  });

  useEffect(() => {
    // loadDatabase()
    //   .then(() => {
    //     setTimeout(() => {
    //       setDbLoaded(true)
    //     }, 500)
    //   })
    //   .catch((e) => console.error(e));
  }, []);


  if (!loaded) {
    return null;
  }

  // if (!dbLoaded) return null // <SplashScreen />


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
