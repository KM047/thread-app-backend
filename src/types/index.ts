export interface IUser {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    avatar?: string;
}

export interface IUserUpdate {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    avatar?: string;
}

export interface IPost {
    id: string;
    title: string;
    content: string;
    author: IUser;
    comments?: IComment[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IComment {
    id: string;
    content: string;
    author: IUser;
    post: IPost;
    createdAt: Date;
    updatedAt: Date;
}
