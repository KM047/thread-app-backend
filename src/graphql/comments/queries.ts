export const Queries = `
# graphql queries

    getAllComments: [Comment]
    getCommentsByPost(postId: String!): [Comment]
    getCommentsByAuthor(authorId: String!): [Comment]
`;
