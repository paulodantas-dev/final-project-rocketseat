export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  title: string;
  description?: string;
  color: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface SignupInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdateProfileInput {
  name: string;
}

export interface CreateCategoryInput {
  title: string;
  description?: string;
  color: string;
  icon: string;
}

export interface UpdateCategoryInput {
  id: string;
  title?: string;
  description?: string;
  color?: string;
  icon?: string;
}

export type TransactionType = "INCOME" | "EXPENSE";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  user?: User;
}

export interface CreateTransactionInput {
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId: string;
}

export interface UpdateTransactionInput {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId: string;
}
