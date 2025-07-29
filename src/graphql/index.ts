import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { prismaClient } from "../lib/db.js";
import { User } from "./users/index.js";
import { Post } from "./posts/index.js";
import { Comment } from "./comments/index.js";

export async function createGraphQLServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
            ${User.typeDefs}
            ${Post.typeDefs}
            ${Comment.typeDefs}
            
            type Query {
                ${User.queries}
                ${Post.queries}
                ${Comment.queries}
                getContext : ITokenContext
            }
            type ITokenContext {
                token: String
            }
            
            type Mutation {
                ${User.mutations}
                ${Post.mutations}
                ${Comment.mutations}
            }
               
                
            `, // Schema
        resolvers: {
            Query: {
                ...User.resolvers.queries,
                ...Post.resolvers.queries,
                ...Comment.resolvers.queries,
                // This resolver is used to get the context in the frontend
                getContext: (_: any, __: any, context) => {
                    // console.log("context ===>", context);
                    return Object.assign({}, context);
                },
            },
            Mutation: {
                ...User.resolvers.mutations,
                ...Post.resolvers.mutations,
                ...Comment.resolvers.mutations,
            },
        },
    });

    await gqlServer.start();

    return gqlServer;
}
