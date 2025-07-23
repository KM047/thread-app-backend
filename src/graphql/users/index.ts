import { typeDefs } from "./typedef.js";
import { Queries } from "./queries.js";
import { Mutations } from "./mutations.js";
import { resolvers as userResolvers } from "./resolvers.js";

export const User = {
    typeDefs,
    queries: Queries,
    mutations: Mutations,
    resolvers: userResolvers,
};
