import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../lib/graphql-client";
import type {
  AuthPayload,
  LoginInput,
  SignupInput,
  UpdateProfileInput,
  User,
} from "../lib/types";
import { gql } from "graphql-request";

const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
        email
        name
        createdAt
        updatedAt
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
        createdAt
        updatedAt
      }
    }
  }
`;

const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      name
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($name: String!) {
    updateProfile(name: $name) {
      id
      email
      name
      createdAt
      updatedAt
    }
  }
`;

export function useSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: SignupInput) => {
      const data = await graphqlClient.request<{ signup: AuthPayload }>(
        SIGNUP_MUTATION,
        input,
      );
      return data.signup;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.setQueryData(["me"], data.user);
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const data = await graphqlClient.request<{ login: AuthPayload }>(
        LOGIN_MUTATION,
        input,
      );
      return data.login;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.setQueryData(["me"], data.user);
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const data = await graphqlClient.request<{ me: User }>(ME_QUERY);
      return data.me;
    },
    enabled: !!localStorage.getItem("token"),
    retry: false,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateProfileInput) => {
      const data = await graphqlClient.request<{ updateProfile: User }>(
        UPDATE_PROFILE_MUTATION,
        input,
      );

      return data.updateProfile;
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["me"], updatedUser);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem("token");
    queryClient.clear();
    window.location.href = "/login";
  };
}
