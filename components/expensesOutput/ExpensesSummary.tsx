import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants';
import { ExpenseType } from '../../types/expense';

interface ExpensesSummaryProps {
  periodName: string;
  expenses: ExpenseType[] | undefined;
}

const ExpensesSummary = ({ periodName, expenses }: ExpensesSummaryProps) => {
  const expensesSum = expenses?.reduce((sum: any, currentItem: any) => {
    return sum + currentItem.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400
  },
  sum: {
    fontSize: 16,
    fontWeight: "700",
    color: GlobalStyles.colors.primary500
  }
});
