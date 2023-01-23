import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ExpenseForm } from '../components/manageExpense/ExpenseForm';
import { GlobalStyles } from '../constants';
import { AppContext } from '../store/AppContext';
import { ActionKind, ValuesProps } from '../types/expense';
import { RootStackParamListRoute } from '../types/navigation';

import IconButton from '../components/UI/IconButton';
import { deleteExpense, storeExpense, updateExpense } from '../utils/http';
import { LoadingOverlay } from '../components/UI/LoadingOverlay';
import { ErrorOverlay } from '../components/UI/ErrorOverlay';


const ManageExpense = ({ route, navigation }: RootStackParamListRoute) => {
  const [editedId, setEditedId] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const { dispatch, state } = React.useContext(AppContext);

  const isEditing = !!editedId;

  React.useEffect(() => {
    if (route.params) {
      setEditedId(route.params.expenseId);
    }
  }, [route.params]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    })
  }, [navigation, isEditing]);

  const selectedExpense = state.expenses.find((expense) => expense.id === editedId)

  const deleteExpenseHandler = async () => {

    dispatch({ type: ActionKind.DELETE, payload: { id: editedId } });
    setLoading(true);
    try {
      await deleteExpense(editedId);
      dispatch({ type: ActionKind.DELETE, payload: editedId });
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense, please try again later")
      setLoading(false);
    }
  }

  const cancelHandler = () => {
    navigation.goBack();
  }

  const confirmHandler = async (expenseData: ValuesProps) => {
    setLoading(true);
    try {
      if (isEditing) {
        dispatch({
          type: ActionKind.UPDATE, payload: {
            currentId: editedId,
            id: editedId,
            description: expenseData.description,
            amount: expenseData.amount,
            date: expenseData.date
          }
        });
        updateExpense(editedId, expenseData);
      } else {
        const id = await storeExpense(expenseData);

        dispatch({
          type: ActionKind.ADD, payload: {
            id,
            description: expenseData.description,
            amount: expenseData.amount,
            date: expenseData.date
          }
        })
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later");
      setLoading(false);
    }
  }

  if (error && !loading) {
    return <ErrorOverlay message={error} />
  }

  if (loading) {
    return <LoadingOverlay />
  }

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
