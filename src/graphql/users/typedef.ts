export const typeDefs = `#graphql
    type User {
        id: String!
        firstName: String!
        lastName: String
        email: String!
        avatar: String
        posts: [Post]
        createdAt: DateTime!
        updatedAt: DateTime!
    }
`;
