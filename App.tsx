import { theme } from '@/providers';
import { AppRouter } from '@/routes';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import { PaperProvider } from 'react-native-paper';



export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AppRouter />
    </PaperProvider>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
