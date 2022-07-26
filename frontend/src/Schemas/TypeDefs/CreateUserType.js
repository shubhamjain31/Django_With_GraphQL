const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const CreateUserType = new GraphQLObjectType({
  name: "CreateUser",
  fields: () => ({
    // id: { type: GraphQLInt },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password1: { type: GraphQLString },
    password2: { type: GraphQLString },
  }),
});

module.exports = CreateUserType;