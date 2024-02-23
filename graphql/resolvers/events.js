const Event = require('./../../models/event');
const {dateToString} = require("../../utils/date");

const {fetchAllEvents,eventDetails} = require("../../service/events.service");
const {transformEvent} = require("./../../utils/eventUtils");
const {userDetails,findUserById} = require("../../service/user.service");
console.log("this is userDetails",findUserById)
module.exports = {
    events: async () => {
        try {
            return fetchAllEvents();
        } catch (error) {
            throw error;
        }


    },
    createEvent: (args) => {
        const newEvent = new Event({
            title: args.event.title,
            description: args.event.description,
            price: +args.event.price,
            date: args.event.date,
            creator: args.event.creator
        });
        let createdEvent = null;
        return newEvent.save().then(result => {
            createdEvent = transformEvent(result);
            return findUserById(args.event.creator);

        }).then((foundUser) => {
            if (!foundUser) {
                throw new Error('User not found');
            }
            foundUser.createdEvents.push(newEvent);
            return foundUser.save();
        }).then((updatedUser) => createdEvent).catch(err => {
            console.log(err);
            throw err;
        });

    }
}