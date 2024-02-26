const Event = require('./../../models/event');
const {dateToString} = require("../../utils/date");

const {fetchAllEvents,eventDetails,createEvent:createEventService} = require("../../service/events.service");
const {transformEvent} = require("./../../utils/eventUtils");
const {userDetails,findUserById} = require("../../service/user.service");
module.exports = {
    events: async () => {
        try {
            return fetchAllEvents();
        } catch (error) {
            throw error;
        }


    },
    createEvent: async (args) => {
        try {
            const event={
                    title: args.event.title,
                    description: args.event.description,
                    price: +args.event.price,
                    date: args.event.date,
                    creator: args.event.creator
                };
           return createEventService(event);
        } catch (error) {
            throw error;
        }
    }
}