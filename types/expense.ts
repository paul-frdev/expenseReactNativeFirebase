export type ExpenseType = {
  id?: any;
  description?: string;
  amount: number;
  date: Date;
};

export enum ActionKind {
  ADD = "ADD",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
  SET = "SET"
}

export interface ValuesProps {
  currentId?: string;
  id?: string;
  description: string;
  amount: number;
  date: Date;
}


export interface InputValuesProps {
  id?: string;
  description?: string;
  amount: string;
  date: string;
}
