import { prismaClient } from "../../lib/db.js";
import { userServices } from "../../services/user.services.js";
import { IUser } from "../../types/index.js";

const queries = {
    getAllUsers: async () => {
        const users = await prismaClient.user.findMany();
        return users;
    },
};
const mutations = {
    createUser: async (_: any, newUser: IUser) => {
        const user = await userServices.createUser(newUser);

        return user !== null;
    },
};

export const resolvers = { queries, mutations };
