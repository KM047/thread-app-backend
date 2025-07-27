export const typeDefs = `#graphql
    type Post {
        id: String!
        title: String!
        content: String!
        author: User!
        comments: [Comment]
        createdAt: String!
        updatedAt: String!
    }
`;
