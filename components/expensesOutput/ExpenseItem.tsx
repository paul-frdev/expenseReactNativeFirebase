import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { GlobalStyles } from '../../constants';
import { ExpenseType } from '../../types/expense';
import { getFormattedDate } from '../../utils/date';


const ExpenseItem = ({ description, amount, date, id }: ExpenseType) => {

  const navigation = useNavigation<any>();
  
  const expressPressHandler = () => {
    navigation.navigate("ManageExpense", { expenseId: id })
  }
  return (
    <Pressable onPress={expressPressHandler} style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.container}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75
  },
  container: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4
  },
  textBase: {
    color: GlobalStyles.colors.primary50
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "700"
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "700"
  }
});
