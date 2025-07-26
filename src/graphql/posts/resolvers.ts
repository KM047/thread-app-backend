import { prismaClient } from "../../lib/db.js";
import { IPost, IUser } from "../../types/index.js";
import { postServices } from "../../services/post.services.js";
import { userServices } from "../../services/user.services.js";

const queries = {
    getAllPosts: async () => {
        const posts = await prismaClient.post.findMany({
            include: { author: true, comments: true },
        });
        return posts;
    },
    getPostById: async (_: any, postId: string) => {
        const token = await postServices.getPostById(postId);
        return token;
    },
    getPostsByAuthor: async (_: any, authorId: string = "", context: any) => {
        if (!context?.token) {
            throw new Error("Unauthorized");
        }

        const user = await userServices.getUserByToken(context.token);
        if (!user) {
            throw new Error("Unauthorized");
        }
        if (!authorId) {
            authorId = user.id;
        }
        const posts = await postServices.getPostsByUserId(authorId);
        return posts;
    },
};
const mutations = {
    createPost: async (_: any, newPost: IPost, context: any) => {
        if (!context?.token) {
            throw new Error("Unauthorized");
        }

        const post = await postServices.createPost(newPost);
        if (!post) {
            throw new Error("Failed to create post");
        }
        return post !== null;
    },
    updatePost: async (_: any, updatedPost: Partial<IPost>, context: any) => {
        if (!context?.token) {
            throw new Error("Unauthorized");
        }
        const user = await userServices.getUserByToken(context.token);
        if (user?.id !== updatedPost?.author?.id) {
            throw new Error("Unauthorized to update this post");
        }
        const post = await postServices.updatePost(
            updatedPost?.id as string,
            updatedPost
        );
        if (!post) {
            throw new Error("Failed to update post");
        }
        return post !== null;
    },
    deletePost: async (_: any, postId: string, context: any) => {
        if (!context?.token) {
            throw new Error("Unauthorized");
        }
        const user = await userServices.getUserByToken(context.token);
        const dbPost = await postServices.getPostById(postId);
        if (dbPost === null) {
            throw new Error("Post not found");
        }

        if (dbPost.authorId !== user?.id) {
            throw new Error("Unauthorized to delete this post");
        }

        const post = await postServices.deletePost(postId);

        return post;
    },
};

export const resolvers = { queries, mutations };
