import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./resolvers";
import { createContext } from "./context";

// Load environment variables
dotenv.config();

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 4000 },
    context: createContext,
  });

  console.log(`🚀 Server ready at: ${url}`);
  console.log(`📊 GraphQL Playground available at: ${url}`);
};

startServer().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
