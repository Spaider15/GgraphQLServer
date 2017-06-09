/**
 * Created by ia.busarov on 07.06.2017.
 */
import {
   graphql,
   GraphQLObjectType,
   GraphQLSchema,
   GraphQLString,
} from "graphql";

import {
   connectionArgs,
   connectionDefinitions,
   connectionFromArray,
   fromGlobalId,
   globalIdField,
   nodeDefinitions,
} from "graphql-relay";

import {
   getEmpire,
   getFaction,
   getRebels,
   getShip,
} from "./data";

const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {
       console.log("id: " + globalId);
       const { type, id } = fromGlobalId(globalId);
       if (type === "Faction") {
          return getFaction(id);
       }
       if (type === "Ship") {
          return getShip(id);
       }
    },
    (obj) => {
       console.log("obj: " + obj);
       return obj.ships ? factionType : shipType;
    },
);

const shipType: any = new GraphQLObjectType({
   name: "Ship",
   description: "A ship in the Star Wars saga",
   interfaces: [ nodeInterface ],
   fields: () => ({
      id: globalIdField(),
      name: {
         type: GraphQLString,
         description: "The name of the ship.",
      },
   }),
});

const { connectionType: shipConnection } =
    connectionDefinitions({ nodeType: shipType });

const factionType: any = new GraphQLObjectType({
   name: "Faction",
   description: "A faction in the Star Wars saga",
   interfaces: [ nodeInterface ],
   fields: () => ({
      id: globalIdField(),
      name: {
         type: GraphQLString,
         description: "The name of the faction.",
      },
      ships: {
         type: shipConnection,
         description: "The ships used by the faction.",
         args: connectionArgs,
         resolve: (faction, args) => connectionFromArray(
             faction.ships.map(getShip),
             args,
         ),
      },
   }),
});

const queryType = new GraphQLObjectType({
   name: "Query",
   fields: () => ({
      rebels: {
         type: factionType,
         resolve: () => getRebels(),
      },
      empire: {
         type: factionType,
         resolve: () => getEmpire(),
      },
      node: nodeField,
   }),
});

export default new GraphQLSchema({
   query: queryType,
});
