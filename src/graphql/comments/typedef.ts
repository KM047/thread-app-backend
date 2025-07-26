export const typeDefs = `#graphql
    type Comment {
        id: String!
        content: String!
        author: User!
        post: Post!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
`;
