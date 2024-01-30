const { buildSchema } = require('graphql');

module.exports=buildSchema(`

type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator:User!
}

type User {
    _id: ID!
    email: String!
    password: String
    createdEvents:[Event!]
}

input UserInput{
    email: String!
    password: String!
}

input EventInput{
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: String!
}

type RootQuery {
    events:[Event!]!
    users:[User!]!
}
type RootMutation {
    createEvent(event: EventInput!): Event 
    createUser(user: UserInput!): User 
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);