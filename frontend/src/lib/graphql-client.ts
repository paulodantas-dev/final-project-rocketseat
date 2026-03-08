import { GraphQLClient } from "graphql-request";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3333";

export const graphqlClient = new GraphQLClient(API_URL, {
  headers: (): Record<string, string> => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
});
