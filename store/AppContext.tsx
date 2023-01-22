import React, { createContext, Dispatch, ReactNode, useReducer } from "react";
import { ExpenseType } from '../types/expense';
import { ExpenseActions, expenseReducer } from './reducers';

interface ExpenseProviderProps {
  children: ReactNode;
}

export type InitialExpenseStateType = {
  expenses: ExpenseType[];
};

const defaultState = {
  expenses: [],
}

export const AppContext = createContext<{
  state: InitialExpenseStateType;
  dispatch: Dispatch<ExpenseActions>
}>({
  state: defaultState,
  dispatch: () => null
});

const mainReducer = ({ expenses }: InitialExpenseStateType, actions: ExpenseActions) => ({
  expenses: expenseReducer(expenses, actions)
});

const AppProvider = ({ children }: ExpenseProviderProps) => {
  const [state, dispatch] = useReducer(mainReducer, defaultState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;