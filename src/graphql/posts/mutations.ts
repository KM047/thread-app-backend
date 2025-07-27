export const Mutations = `
# graphql mutations
    createPost(title: String!, content: String!): Boolean
    updatePost(id: String!, title: String, content: String): Boolean
    deletePost(id: String!): Boolean
`;
