import { prismaClient } from "../../lib/db.js";
import { userServices } from "../../services/user.services.js";
import { IUser, IComment } from "../../types/index.js";
import { commentServices } from "./../../services/comment.services.js";

const queries = {
    getAllComments: async (_: any) => {
        //

        const comments = await prismaClient.comment.findMany({
            include: { author: true, post: true },
        });

        return comments;
    },
    getCommentsByPost: async (_: any, postId: string) => {
        //
    },
    getCommentsByAuthor: async (_: any, authorID: string) => {
        //
    },
};
const mutations = {
    createComment: async (
        _: any,
        { postId, content }: { postId: string; content: string },
        context: any
    ) => {
        if (!context?.token) {
            throw new Error("Unauthorized");
        }

        const user = await userServices.getUserByToken(context.token);
        if (!user) {
            throw new Error("Unauthorized");
        }

        const comment = await commentServices.createComment({
            postId,
            content,
            authorId: user.id,
        });

        return comment !== null;
    },
    updateComment: async (
        _: any,
        { id, content }: { id: string; content: string },
        context: any
    ) => {
        if (!context?.token) {
            throw new Error("Unauthorized");
        }

        const user = await userServices.getUserByToken(context.token);
        if (!user) {
            throw new Error("Unauthorized");
        }

        const updatedComment = await commentServices.updateComment(
            id,
            content,
            user.id
        );
        return updatedComment !== null;
    },
    deleteComment: async (
        _: any,
        { postId, commentId }: { postId: string; commentId: string },
        context: any
    ) => {
        if (!context?.token) {
            throw new Error("Unauthorized");
        }

        const user = await userServices.getUserByToken(context.token);
        if (!user) {
            throw new Error("Unauthorized");
        }

        const deletedComment = await commentServices.deleteComment(
            postId,
            commentId
        );
        return deletedComment !== null;
    },
};

export const resolvers = { queries, mutations };
