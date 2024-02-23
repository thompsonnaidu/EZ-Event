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

type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
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
    bookings:[Booking!]!
}
type RootMutation {
    createEvent(event: EventInput!): Event 
    createUser(user: UserInput!): User 
    bookEvent(eventId:ID!): Booking!
    cancelBooking(bookingID:ID!): Event!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);