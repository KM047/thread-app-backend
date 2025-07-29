import { Mutations } from "./mutations.js";
import { Queries } from "./queries.js";
import { resolvers as commentResolvers } from "./resolvers.js";
import { typeDefs } from "./typedef.js";

export const Comment = {
    typeDefs,
    queries: Queries,
    mutations: Mutations,
    resolvers: commentResolvers,
};
