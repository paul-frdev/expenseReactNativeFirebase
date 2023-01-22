import { RootStackParamList } from '../types/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageExpense from '../screens/ManageExpense';
import BottomTabsNavigation from './BottomTabsNavigation';
import { GlobalStyles } from '../constants';

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export const NativeNavigation = () => {
  return (
    <NavigationContainer>
      <NativeStack.Navigator screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "#fff"
      }}>
        <NativeStack.Screen name="BottomTabs" component={BottomTabsNavigation} options={{
          headerTitle: '',
        }}/>
        <NativeStack.Screen name="ManageExpense" component={ManageExpense} options={{
          presentation: "modal"
        }} />
      </NativeStack.Navigator>
    </NavigationContainer>
  )
}