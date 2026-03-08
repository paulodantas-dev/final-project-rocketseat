import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { graphqlClient } from "@/lib/graphql-client";
import type { CreateTransactionInput, Transaction } from "@/lib/types";

const TRANSACTIONS_QUERY = gql`
  query Transactions {
    transactions {
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

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const data = await graphqlClient.request<{ transactions: Transaction[] }>(
        TRANSACTIONS_QUERY,
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
