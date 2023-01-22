import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Input } from './Input'
import Button from '../UI/Button';
import { ExpenseType } from '../../types/expense';
import { GlobalStyles } from '../../constants';

interface Props {
  id?: any;
  amount: any;
  date: any;
  description?: any;
}
interface ExpenseFormProps {
  isEditing?: boolean;
  defaultValues?: Props;
  onCancel?: () => void;
  onSubmit?: (data: any) => void;
}

export const ExpenseForm = ({ isEditing, onCancel, onSubmit, defaultValues }: ExpenseFormProps) => {

  const [inputs, setInputs] = useState<Props>();
  
  useEffect(() => {
      setInputs({
        amount: {
          value: defaultValues?.amount || "",
          isValid: true
        },
        date: {
          value: defaultValues?.date.toISOString().slice(0, 10) || "",
          isValid: true
        },
        description: {
          value: defaultValues?.description || "",
          isValid: true
        }
      });
  }, [defaultValues]);

  const inputChangedHandler = (inputIdentifier: string, enteredText: string) => {
    setInputs((currentInputs: any) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredText, isValid: true }
      }
    });
  }

  const submitHandler = () => {
    const expenseData: ExpenseType = {
      amount: +inputs?.amount.value,
      date: new Date(inputs?.date.value),
      description: inputs?.description.value
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = Date.parse(expenseData.date as any);
    const descriptionIsValid = expenseData.description && expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currentInputs: any) => {
        return {
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          description: { value: currentInputs.description.value, isValid: descriptionIsValid }
        }
      })
      return;
    }
    onSubmit?.(expenseData);
  }

  const formIsInValid = !inputs?.amount.isValid || !inputs?.date.isValid || !inputs?.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          inValid={!inputs?.amount.isValid}
          textInfoConfig={{
            KeyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs?.amount.value.toString()
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          inValid={!inputs?.date.isValid}
          textInfoConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs?.date.value
          }}
        />
      </View>
      <Input
        label="Description"
        inValid={!inputs?.description.isValid}
        textInfoConfig={{
          multiline: true,
          numberOfLines: 3,
          autoCorrect: false,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs?.description.value
        }}
      />
      {formIsInValid && <Text style={styles.errorText}>Invalid input values, please check your entered data</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
        <Button style={styles.button} onPress={submitHandler}>{isEditing ? "Update" : "Add"}</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginVertical: 24,
    textAlign: "center"
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  button: {
    width: 120,
    marginHorizontal: 8
  },
})