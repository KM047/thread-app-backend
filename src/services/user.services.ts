import { createHmac, randomBytes } from "node:crypto";
import { prismaClient } from "../lib/db.js";
import { IUser } from "./../types/index.js";
import JWT from "jsonwebtoken";

class UserServices {
    /**
     * createUser
     */
    public createUser(newUser: IUser) {
        const { firstName, lastName, email, password } = newUser;
        const genSalt = randomBytes(32).toString("hex");
        const hashedPassword = this.generateHashPassword(genSalt, password);
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

    public async getUserByEmail(email: string) {
        return await prismaClient.user.findFirst({
            where: {
                email: email,
            },
        });
    }

    /**
     * generateHashPassword
     */
    public generateHashPassword(salt: string, password: string) {
        return createHmac("sha256", salt).update(password).digest("hex");
    }

    public async getUserToken(userCredentials: {
        email: string;
        password: string;
    }) {
        const { email, password } = userCredentials;
        const user = await this.getUserByEmail(email);
        if (!user) {
            return null;
        }
        const hashedPassword = this.generateHashPassword(user.salt, password);

        if (hashedPassword !== user.password) {
            return null;
        }

        // Generate JWT token
        const token = JWT.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1h",
            }
        );
        return token;
    }

    public decodeToken(token: string) {
        try {
            const decoded = JWT.verify(
                token,
                process.env.JWT_SECRET as string
            ) as any;
            return decoded;
        } catch (error) {
            return null;
        }
    }

    public async getUserByToken(token: string) {
        try {
            const decodedToken = this.decodeToken(token);
            const user = await prismaClient.user.findUnique({
                where: {
                    id: decodedToken.id,
                },
            });
            return user;
        } catch (error) {
            return null;
        }
    }
}

// export default UserServices;
export const userServices = new UserServices();
