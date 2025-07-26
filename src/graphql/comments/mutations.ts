export const Mutations = `
# graphql mutations
    createComment(postId: String!, content: String!): Boolean
    updateComment(id: String!, content: String!): Boolean
    deleteComment(postId: String!, commentId: String!): Boolean
`;
