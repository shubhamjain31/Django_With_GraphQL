const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

module.exports = UserType;