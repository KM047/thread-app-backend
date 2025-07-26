export const Queries = `
# graphql queries

    getAllComments: [Comment]
    getCommentById(id: String!): Comment
    getCommentsByPost(postId: String!): [Comment]
    getCommentsByAuthor(authorId: String!): [Comment]
`;