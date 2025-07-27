import { prismaClient } from "../lib/db.js";

class CommentService {
    public async getCommentsByPostId(postId: string) {
        return await prismaClient.comment.findMany({
            where: {
                postId: postId,
            },
        });
    }

    public async createComment(commentData: {
        postId: string;
        content: string;
        authorId: string;
    }) {
        return await prismaClient.comment.create({
            data: {
                postId: commentData.postId,
                content: commentData.content,
                authorId: commentData.authorId,
            },
        });
    }

    public updateComment(commentId: string, content: string, userId: string) {
        return prismaClient.comment.update({
            where: {
                id: commentId,
                authorId: userId,
            },
            data: {
                content: content,
            },
        });
    }

    public async deleteComment(postId: string, commentId: string) {
        return await prismaClient.comment.delete({
            where: {
                id: commentId,
            },
        });
    }
}

export const commentServices = new CommentService();
