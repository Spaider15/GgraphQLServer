/**
 * Created by ia.busarov on 07.06.2017.
 */
import {
   graphql,
   GraphQLObjectType,
   GraphQLSchema,
   GraphQLString,
} from "graphql";

export default new GraphQLSchema({
   query: new GraphQLObjectType({
      name: "RootQueryType",
      fields: {
         hello: {
            type: GraphQLString,
            resolve() {
               return "world";
            },
         },
      },
   }),
});
