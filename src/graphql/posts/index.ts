import { Mutations } from "./mutations.js";
import { Queries } from "./queries.js";
import { resolvers as postResolvers } from "./resolvers.js";
import { typeDefs } from "./typedef.js";

export const Post = {
    typeDefs,
    queries: Queries,
    mutations: Mutations,
    resolvers: postResolvers,
};
