import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/expensesOutput/ExpensesOutput';
import { ErrorOverlay } from '../components/UI/ErrorOverlay';
import { LoadingOverlay } from '../components/UI/LoadingOverlay';
import { AppContext } from '../store/AppContext';
import { ActionKind, ExpenseType } from '../types/expense';
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/http';

interface RecentExpensesProps { }

const RecentExpenses = (props: RecentExpensesProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { dispatch, state } = useContext(AppContext);

  useEffect(() => {
    const getExpenses = async () => {
      setLoading(true);
      try {
        const expenses = await fetchExpenses();
        dispatch({ type: ActionKind.SET, payload: expenses })
      } catch (error) {
        setError("Could not fetch expenses")
      }
      setLoading(false);

    }
    getExpenses();
  }, []);

  const errorHandler = () => {
    setError("");
  };

  const resentExpenses = state.expenses.filter((expense: ExpenseType) => {
    const today = new Date();
    const dateSevenDaysAgo = getDateMinusDays(today, 7);

    return expense.date >= dateSevenDaysAgo && expense.date <= today;
  })

  if (error && !loading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }
  if (loading) {
    return <LoadingOverlay />
  }

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={resentExpenses}
      fallBackText="No recent expenses registered for the last 7 days"
    />

  );
};

export default RecentExpenses;

