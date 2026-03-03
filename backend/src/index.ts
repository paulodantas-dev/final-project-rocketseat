import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { prisma } from "./lib/prisma";

const typeDefs = `#graphql
  scalar DateTime

  type Category {
    id: ID!
    title: String!
    description: String
    color: String!
    icon: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }


  type Query {
    categories: [Category]
  }
`;

const resolvers = {
  Query: {
    categories: async () => {
      return prisma.category.findMany({
        orderBy: { createdAt: "desc" },
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3333 },
});

console.log(`🚀  Server ready at: ${url}`);
