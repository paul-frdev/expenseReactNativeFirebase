import * as React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { ExpenseType } from '../../types/expense';
import ExpenseItem from './ExpenseItem';

interface ExpensesListProps {
  expenses: ExpenseType[] | undefined;
}

const ExpensesList = ({ expenses }: ExpensesListProps) => {
  const renderExpenseItem = (itemData: any) => {
    return (
      <ExpenseItem
        description={itemData.item.description}
        amount={itemData.item.amount}
        date={itemData.item.date}
        id={itemData.item.id}
      />
    )
  }
  return (
    <View style={styles.container}>
      <Text>ExpensesList</Text>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
};

export default ExpensesList;

const styles = StyleSheet.create({
  container: {}
});
