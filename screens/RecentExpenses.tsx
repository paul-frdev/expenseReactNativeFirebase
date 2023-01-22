import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/expensesOutput/ExpensesOutput';
import { AppContext } from '../store/AppContext';
import { ActionKind, ExpenseType } from '../types/expense';
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/http';

interface RecentExpensesProps { }

const RecentExpenses = (props: RecentExpensesProps) => {
  const { dispatch, state } = useContext(AppContext);

  useEffect(() => {
    const getExpenses = async () => {
      const expenses = await fetchExpenses();
      dispatch({ type: ActionKind.SET, payload: expenses })
    }
    getExpenses();
  }, []);

  const resentExpenses = state.expenses.filter((expense: ExpenseType) => {
    const today = new Date();
    const dateSevenDaysAgo = getDateMinusDays(today, 7);

    return expense.date >= dateSevenDaysAgo && expense.date <= today;
  })
  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={resentExpenses}
      fallBackText="No recent expenses registered for the last 7 days"
    />

  );
};

export default RecentExpenses;

