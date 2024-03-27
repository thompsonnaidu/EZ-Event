
const {events:fetchEventResolver,createEvent:createEventResolver} = require("./events");
const {reserveTicket,cancelTicket,bookings:bookingsResolver} = require("./booking");
const {retrieveAllUser,createUser:createUserResolver,login:loginResolver} = require("./users");



// exporting the root resolver
module.exports = {
    events: fetchEventResolver,
    users: retrieveAllUser,
    bookings: bookingsResolver,
    createEvent: createEventResolver,
    createUser: createUserResolver,
    bookEvent: reserveTicket,
    cancelBooking: cancelTicket,
    login:loginResolver
}