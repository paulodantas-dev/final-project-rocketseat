import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { graphqlClient } from "../lib/graphql-client";
import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../lib/types";

const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      title
      description
      color
      icon
      createdAt
      updatedAt
    }
  }
`;

const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory(
    $title: String!
    $description: String
    $color: String!
    $icon: String!
  ) {
    createCategory(
      title: $title
      description: $description
      color: $color
      icon: $icon
    ) {
      id
      title
      description
      color
      icon
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory(
    $id: String!
    $title: String
    $description: String
    $color: String
    $icon: String
  ) {
    updateCategory(
      id: $id
      title: $title
      description: $description
      color: $color
      icon: $icon
    ) {
      id
      title
      description
      color
      icon
      createdAt
      updatedAt
    }
  }
`;

const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id)
  }
`;

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await graphqlClient.request<{ categories: Category[] }>(
        CATEGORIES_QUERY,
      );
      return data.categories;
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateCategoryInput) => {
      const data = await graphqlClient.request<{ createCategory: Category }>(
        CREATE_CATEGORY_MUTATION,
        input,
      );
      return data.createCategory;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateCategoryInput) => {
      const data = await graphqlClient.request<{ updateCategory: Category }>(
        UPDATE_CATEGORY_MUTATION,
        input,
      );
      return data.updateCategory;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await graphqlClient.request<{ deleteCategory: boolean }>(
        DELETE_CATEGORY_MUTATION,
        { id },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
