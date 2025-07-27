import { prismaClient } from "../lib/db.js";
import { IPost } from "../types/index.js";

class PostServices {
    public createPost(newPost: IPost) {
        const { title, content, author } = newPost;
        return prismaClient.post.create({
            data: {
                title,
                content,
                authorId: author.id,
            },
        });
    }

    public getPostsByUserId(userId: string) {
        return prismaClient.post.findMany({
            where: { authorId: userId },
            include: { author: true, comments: true },
        });
    }

    public getPostById(postId: string) {
        return prismaClient.post.findUnique({
            where: { id: postId },
            include: { author: true, comments: true },
        });
    }
    public updatePost(postId: string, updatedPost: Partial<IPost>) {
        return prismaClient.post.update({
            where: { id: postId },
            data: {
                title: updatedPost.title,
                content: updatedPost.content,
            },
        });
    }

    public deletePost(postId: string) {
        return prismaClient.post.delete({
            where: { id: postId },
        });
    }
}

export const postServices = new PostServices();
