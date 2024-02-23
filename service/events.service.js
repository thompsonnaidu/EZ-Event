const Event = require('../models/event');

const {transformEvent} = require("../utils/eventUtils");




// fetch single event details from the table
const eventDetails = async(eventIds) => {

    try {
       const eventList=await  Event.findOne({ _id: { $in: eventIds } });
       if(eventList!=null)
        return transformEvent(eventList);
      // return await Promise.all(eventList.map(async event =>  transformEvent(event)))

    } catch (err) {
        console.log("error while fetching event details", err);
         throw err; 
    }

}


// fetch all the events from the table
const fetchAllEvents = async () =>{
    try {
        const eventList = await Event.find();
        return eventList.map(async (event) => {
            return transformEvent(event);
        })
    } catch (error) {
        console.log(error, "this is the error while events fetching");
        throw error;
    }
}


module.exports = {
    fetchAllEvents,
    eventDetails
}