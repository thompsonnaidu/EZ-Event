const Event = require('../models/event');
const user = require('../models/user');

const {transformEvent} = require("../utils/eventUtils");




// fetch single event details from the table
const eventDetails = async(eventIds) => {

    try {
       const eventList=await  Event.findOne({ _id: { $in: eventIds } });
       if(eventList!=null)
        return transformEvent(eventList);

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

const createEvent = async event =>{
    const newEvent = new Event({...event});
    let createdEvent = null;
    try {
       const savedEvent= await newEvent.save();
       createdEvent = await transformEvent(savedEvent);
       const existingUser=await user.findById(event.creator);
       if(!existingUser){
            throw new Error("User not found");
       } 
       existingUser.createdEvents.push(createdEvent);
       await existingUser.save();
       return createdEvent;
    } catch (error) {
        throw error;
    }
    
}
module.exports = {
    fetchAllEvents,
    eventDetails,createEvent
}