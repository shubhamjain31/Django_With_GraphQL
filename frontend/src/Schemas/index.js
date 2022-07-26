const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
// const userData = require("../MOCK_DATA.json");

const UserType = require("./TypeDefs/UserType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // getAllUsers: {
    //   type: new GraphQLList(UserType),
    //   args: { id: { type: GraphQLInt } },
    //   resolve(parent, args) {
    //     return userData;
    //   },
    // },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    tokenAuth: {
      type: UserType,
      args: {
        email:      { type: GraphQLString },
        password:   { type: GraphQLString },
      },
    //   resolve(parent, args) {
    //     userData.push({
    //       id: userData.length + 1,
    //       email: args.email,
    //       password: args.password,
    //     });
    //     return args;
    //   },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });