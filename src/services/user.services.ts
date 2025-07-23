import { createHmac, randomBytes } from "node:crypto";
import { prismaClient } from "../lib/db.js";
import { IUser } from "./../types/index.js";

class UserServices {
    /**
     * createUser
     */
    public createUser(newUser: IUser) {
        const { firstName, lastName, email, password } = newUser;
        const genSalt = randomBytes(32).toString("hex");
        const hashedPassword = createHmac("sha256", genSalt)
            .update(password)
            .digest("hex");
        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                salt: genSalt,
            },
        });
    }
}

// export default UserServices;
export const userServices = new UserServices();
