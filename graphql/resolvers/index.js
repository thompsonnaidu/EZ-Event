const Event = require('./../../models/event');
const User = require("./../../models/user");
const bcrypt = require('bcryptjs');
const {dateToString} = require("../../utils/date");
const {events:fetchEventResolver,createEvent:createEventResolver} = require("./events");
const {reserveTicket,cancelTicket,bookings:bookingsResolver} = require("./booking");
const transformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event._doc.date),
        creator: userDetails.bind(this, event._doc.creator)
    }
}


const transformBooking =  async booking =>{
   return  {
        ...booking._doc,
        user: userDetails.bind(this, booking._doc.user),
        event: eventDetails.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }
}

// fetch the user information from the database
const userDetails = userId => {
    return User.findById(userId).then(userInfo => {
        return { ...userInfo._doc, _id: userInfo.id }
    }).catch(err => { throw err; })
}

// fetch single event details from the table
const eventDetails = eventIds => {
    return Event.find({ _id: { $in: eventIds } }).then(eventList => {
        return eventList.map(event => {
            console.log(event._doc, "this is the event")
            return transformEvent(event);
        });
    }).catch(err => { console.log("error while fetching event details", err); throw err; })

}


// exporting the root resolver
module.exports = {
    events: fetchEventResolver,
    users: async () => {
        try {
            const userList = await User.find();
            return userList.map(async (user) => {
                return { ...user._doc, password: null, createdEvents:  eventDetails.bind(this, user._doc.createdEvents) };
            });
        } catch (error) {
            throw error;
        }

    },
    bookings: bookingsResolver,
    createEvent: createEventResolver,

    createUser: (args) => {
        console.log(args, "this are the args");

        return User.findOne({ email: args.user.email }).then(user => {
            if (user) {
                throw new Error('User exists already.');
            }

            return bcrypt.hash(args.user.password, 12);
        }).then(hashedPassword => {
            const newUser = new User({
                email: args.user.email,
                password: hashedPassword
            });

            return newUser.save()
        }).then(result => {
            console.log(result);
            return { ...result._doc, _id: result.id, password: null };
        }).catch(err => {
            console.log(err);
            throw err;
        });


    },

    bookEvent: reserveTicket,

    cancelBooking: cancelTicket,
}