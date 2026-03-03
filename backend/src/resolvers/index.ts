import { authResolvers } from "./auth";
import { categoryResolvers } from "./category";
import { transactionResolvers } from "./transaction";

export const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...categoryResolvers.Query,
    ...transactionResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...transactionResolvers.Mutation,
  },
};
