import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../../constants';
import { ExpenseType } from '../../types/expense';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

interface ExpensesOutputProps {
  expenses?: ExpenseType[];
  expensesPeriod: string;
  fallBackText?: string;
}

const ExpensesOutput = ({ expenses, expensesPeriod, fallBackText }: ExpensesOutputProps) => {
  
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {expenses?.length > 0 ? (
         <ExpensesList expenses={expenses} />
      ): (
        <Text style={styles.fallBackTextInfo}>{fallBackText}</Text>
      )}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  },
  fallBackTextInfo: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32
  }
});
