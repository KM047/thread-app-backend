import { createHmac, randomBytes } from "node:crypto";
import { prismaClient } from "../lib/db.js";
import { IUser, IUserUpdate } from "./../types/index.js";
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

    public updateUser(user: IUserUpdate) {
        const { id, firstName, lastName, email } = user;
        return prismaClient.user.update({
            where: { id },
            data: { firstName, lastName, email },
        });
    }

    public deleteUser(userId: string) {
        prismaClient.post.deleteMany({
            where: { authorId: userId },
        });

        return prismaClient.user.delete({
            where: { id: userId },
        });
    }

    public updateUserAvatar(id: string, avatar: string) {
        return prismaClient.user.update({
            where: { id },
            data: { avatar },
        });
    }

    public getUserByEmail(email: string) {
        return prismaClient.user.findFirst({
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
            if (!decoded || !decoded.id) {
                throw new Error("Invalid token");
            }

            return decoded;
        } catch (error) {
            return null;
        }
    }

    public async getUserByToken(token: string) {
        try {
            if (!token) {
                throw new Error("No token provided");
            }

            const decodedToken = this.decodeToken(token);

            const user = await prismaClient.user.findUnique({
                where: {
                    id: decodedToken.id,
                },
            });

            if (!user) {
                throw new Error("User not found");
            }

            return user;
        } catch (error) {
            return null;
        }
    }
}

export const userServices = new UserServices();
