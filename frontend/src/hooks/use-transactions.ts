import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { graphqlClient } from "@/lib/graphql-client";
import type {
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput,
} from "@/lib/types";

export interface TransactionFilters {
  search?: string;
  type?: "INCOME" | "EXPENSE";
  categoryId?: string;
  startDate?: string;
  endDate?: string;
}

const TRANSACTIONS_QUERY = gql`
  query Transactions(
    $search: String
    $type: TransactionType
    $categoryId: String
    $startDate: DateTime
    $endDate: DateTime
  ) {
    transactions(
      search: $search
      type: $type
      categoryId: $categoryId
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      description
      amount
      type
      date
      createdAt
      updatedAt
      category {
        id
        title
        description
        color
        icon
        createdAt
        updatedAt
      }
    }
  }
`;

const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransaction(
    $description: String!
    $amount: Float!
    $type: TransactionType!
    $date: DateTime!
    $categoryId: String!
  ) {
    createTransaction(
      description: $description
      amount: $amount
      type: $type
      date: $date
      categoryId: $categoryId
    ) {
      id
      description
      amount
      type
      date
      createdAt
      updatedAt
      category {
        id
        title
        description
        color
        icon
        createdAt
        updatedAt
      }
    }
  }
`;

const UPDATE_TRANSACTION_MUTATION = gql`
  mutation UpdateTransaction(
    $id: String!
    $description: String!
    $amount: Float!
    $type: TransactionType!
    $date: DateTime!
    $categoryId: String!
  ) {
    updateTransaction(
      id: $id
      description: $description
      amount: $amount
      type: $type
      date: $date
      categoryId: $categoryId
    ) {
      id
      description
      amount
      type
      date
      createdAt
      updatedAt
      category {
        id
        title
        description
        color
        icon
        createdAt
        updatedAt
      }
    }
  }
`;

const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id)
  }
`;

export function useTransactions(filters?: TransactionFilters) {
  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: async () => {
      const data = await graphqlClient.request<{ transactions: Transaction[] }>(
        TRANSACTIONS_QUERY,
        filters || {},
      );
      return data.transactions;
    },
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTransactionInput) => {
      const data = await graphqlClient.request<{
        createTransaction: Transaction;
      }>(CREATE_TRANSACTION_MUTATION, input);

      return data.createTransaction;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateTransactionInput) => {
      const data = await graphqlClient.request<{
        updateTransaction: Transaction;
      }>(UPDATE_TRANSACTION_MUTATION, input);

      return data.updateTransaction;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await graphqlClient.request<{ deleteTransaction: boolean }>(
        DELETE_TRANSACTION_MUTATION,
        { id },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}
