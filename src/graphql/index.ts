import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { prismaClient } from "../lib/db.js";
import { User } from "./users/index.js";

export async function createGraphQLServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
            ${User.typeDefs}

            type Query {
                ${User.queries}
            }
            
            type Mutation {
                ${User.mutations}
            }
               
                
            `, // Schema

        resolvers: {
            Query: {
                ...User.resolvers.queries,
            },
            Mutation: {
                ...User.resolvers.mutations,
            },
        },
    });

    await gqlServer.start();

    return gqlServer;
}
