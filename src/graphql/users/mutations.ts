export const Mutations = `
# graphql mutations
    createUser(firstName: String!, lastName: String, email: String!, password: String!): Boolean
    updateUser(id: String!, firstName: String, lastName: String, email: String, password: String): Boolean
    updateUserAvatar(id: String!, avatar: String!): Boolean
    deleteUser(id: String!): Boolean
`;
