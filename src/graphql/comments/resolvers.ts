import { prismaClient } from "../../lib/db.js";
import { userServices } from "../../services/user.services.js";
import { IUser } from "../../types/index.js";

const queries = {};
const mutations = {};

export const resolvers = { queries, mutations };
