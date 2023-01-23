import axios from "axios";

const BASE_URL = `https://expense-react-native-e0acc-default-rtdb.firebaseiocom`;

export const storeExpense = async (expenseData: unknown) => {
  const response = await axios.post(`${BASE_URL}/expenses.json`, expenseData);
  const id = response.data.name;

  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(`${BASE_URL}/expenses.json`);

  const expenses: any = [];

  for (const key in response.data) {
    const responseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(responseObj);
  }

  return expenses;
};

export const updateExpense = (id: string, expenseData: unknown) => {
  return axios.put(`${BASE_URL}/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id: string) => {
  return axios.delete(`${BASE_URL}/expenses/${id}.json`);
};
