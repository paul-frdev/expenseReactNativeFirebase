import { useContext } from 'react';
import ExpensesOutput from '../components/expensesOutput/ExpensesOutput';
import { AppContext } from '../store/AppContext';

interface AllExpensesProps { }

const AllExpenses = (props: AllExpensesProps) => {
  const expensesContext = useContext(AppContext)
  return (
    <ExpensesOutput
      expensesPeriod='Total'
      expenses={expensesContext.state.expenses}
      fallBackText="No expenses registered found"
    />
  );
};

export default AllExpenses;

