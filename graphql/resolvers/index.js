
const {events:fetchEventResolver,createEvent:createEventResolver} = require("./events");
const {reserveTicket,cancelTicket,bookings:bookingsResolver} = require("./booking");
const {retrieveAllUser,createUser:createUserResolver} = require("./users");

// // fetch the user information from the database
// const userDetails = userId => {
//     return User.findById(userId).then(userInfo => {
//         return { ...userInfo._doc, _id: userInfo.id }
//     }).catch(err => { throw err; })
// }


// exporting the root resolver
module.exports = {
    events: fetchEventResolver,
    users: retrieveAllUser,
    bookings: bookingsResolver,
    createEvent: createEventResolver,
    createUser: createUserResolver,
    bookEvent: reserveTicket,
    cancelBooking: cancelTicket,
}