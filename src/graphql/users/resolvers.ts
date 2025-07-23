import { prismaClient } from "../../lib/db.js";
import { userServices } from "../../services/user.services.js";
import { IUser } from "../../types/index.js";

const queries = {
    getAllUsers: async () => {
        const users = await prismaClient.user.findMany();
        return users;
    },
    getUserToken: async (
        _: any,
        userCredentials: { email: string; password: string }
    ) => {
        const token = await userServices.getUserToken(userCredentials);
        return token;
    },
    getCurrentUser: async (_: any, __: any, context: any) => {
        const user = await userServices.getUserByToken(context?.token);
        return user;
    },
};
const mutations = {
    createUser: async (_: any, newUser: IUser) => {
        const user = await userServices.createUser(newUser);

        return user !== null;
    },
};

export const resolvers = { queries, mutations };
