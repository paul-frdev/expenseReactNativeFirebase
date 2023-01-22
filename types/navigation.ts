import { NativeStackScreenProps } from '@react-navigation/native-stack';


export type RootStackParamList = {
  BottomTabs: BottomStackParamList;
  ManageExpense: { expenseId: number };
};

export type RootStackParamListRoute = NativeStackScreenProps<RootStackParamList, "ManageExpense">;

export type BottomStackParamList = {
  ManageExpense: undefined;
  AllExpenses: undefined;
  RecentExpenses: undefined;
};

