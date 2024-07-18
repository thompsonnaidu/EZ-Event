const express= require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schemaBuilder = require('./graphql/schema/index');
const resolverBuilder = require('./graphql/resolvers/index');
const mongoose = require('mongoose');
const isAuth = require("./middelware/is-auth.middleware");
const app= express();

const PORT= process.env.PORT || 3001;
app.use(express.json());  

//set headers for CORS
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);
app.use('/graphql',graphqlHTTP({
    schema: schemaBuilder,
    rootValue: resolverBuilder,
    graphiql: process.env.ENABLE_GRAPHIQL || false

}));  


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.gpzra9n.mongodb.net/${process.env.MONGO_DB}`, {useNewUrlParser: true, useUnifiedTopology: true})    


app.listen(PORT, () => {   
    console.log('Server is running on port '+PORT);
 });