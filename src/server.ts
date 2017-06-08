/**
 * Created by ia.busarov on 07.06.2017.
 */
import express = require("express");
import graphqlHTTP = require("express-graphql");
import MyGraphQLSchema from "./schema";

const app = express();

app.use("/", graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
}));

app.listen(80);
