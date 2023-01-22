import { StatusBar } from 'expo-status-bar';
import { NativeNavigation } from './navigators/NativeNavigation';
import AppProvider from './store/AppContext';

export default function App() {
  return (
    <>
      <AppProvider>
        <StatusBar style="light" />
        <NativeNavigation />
      </AppProvider>
    </>
  );
}
