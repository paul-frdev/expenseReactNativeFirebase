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
  currentId?: number;
  id?: number;
  description: string;
  amount: number;
  date: Date;
}


export interface InputValuesProps {
  id?: number;
  description?: string;
  amount: string;
  date: string;
}
