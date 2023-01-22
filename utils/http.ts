import axios from "axios";

const BASE_URL = `https://expense-react-native-e0acc-default-rtdb.firebaseio.com/`;

export const storeExpense = (expenseData: unknown) => {
  axios.post(`${BASE_URL}/expenses.json`, expenseData);
};

export const fetchExpenses = async () => {
  const response = await axios.get(`${BASE_URL}/expenses.json`);
  
  const expenses: any = [];
  
  for (const key in response.data) {
    const responseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    }

    expenses.push(responseObj);
  }

  return expenses;
};
