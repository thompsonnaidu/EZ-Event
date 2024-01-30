const express= require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schemaBuilder = require('./graphql/schema/index');
const resolverBuilder = require('./graphql/resolvers/index');
const mongoose = require('mongoose');
const app= express();


app.use(express.json());    


app.use('/graphql',graphqlHTTP({
    schema: schemaBuilder,
    rootValue: resolverBuilder,
    graphiql: true

}));  


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.gpzra9n.mongodb.net/${process.env.MONGO_DB}`, {useNewUrlParser: true, useUnifiedTopology: true})    


app.listen(3000, () => {   
    console.log('Server is running on port 3000');
 });