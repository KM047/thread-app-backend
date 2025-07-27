export const Queries = `
# graphql queries
    getAllPosts: [Post]
    getPostById(id: String!): Post
    getPostsByAuthor(authorId: String!): [Post]
`;
