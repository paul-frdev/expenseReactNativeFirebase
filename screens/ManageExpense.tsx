import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ExpenseForm } from '../components/manageExpense/ExpenseForm';
import { GlobalStyles } from '../constants';
import { AppContext } from '../store/AppContext';
import { ActionKind, ValuesProps } from '../types/expense';
import { RootStackParamListRoute } from '../types/navigation';

import IconButton from '../components/UI/IconButton';
import { storeExpense } from '../utils/http';


const ManageExpense = ({ route, navigation }: RootStackParamListRoute) => {
  const { dispatch, state } = React.useContext(AppContext);
  const [editedId, setEditedId] = React.useState<any>();

  React.useEffect(() => {
    if (route.params) {
      setEditedId(route.params.expenseId);
    }
  }, [route.params])

  const isEditing = !!editedId;

  const selectedExpense = state.expenses.find((expense) => expense.id === editedId)
    
  const deleteExpenseHandler = () => {
    dispatch({ type: ActionKind.DELETE, payload: { id: editedId } })
    navigation.goBack();
  }

  const cancelHandler = () => {
    navigation.goBack();
  }

  const confirmHandler = (expenseData: ValuesProps) => {
    if (isEditing) {
      console.log(editedId);
      
      dispatch({
        type: ActionKind.UPDATE, payload: {
          currentId: editedId,
          id: editedId,
          description: expenseData.description,
          amount: expenseData.amount,
          date: expenseData.date
        }
      })
    } else {
      storeExpense(expenseData);
      dispatch({
        type: ActionKind.ADD, payload: {
          id: Math.round(Math.random() * 1000),
          description: expenseData.description,
          amount: expenseData.amount,
          date: expenseData.date
        }
      })
    }
    navigation.goBack();
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    })
  }, [navigation, isEditing])

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        defaultValues={selectedExpense}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            iconName="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center"
  }
});
