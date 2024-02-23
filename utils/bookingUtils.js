
const {dateToString} = require("./date");
const {userDetails} = require("../service/user.service");
const {eventDetails} = require("../service/events.service");
const transformBooking =  async booking =>{
    const userInfo= await userDetails(booking._doc.user);
    const eventInfo= await eventDetails(booking._doc.event);
    return {
         ...booking._doc,
         user:userInfo,
         event: eventInfo,
         createdAt: dateToString(booking._doc.createdAt),
         updatedAt: dateToString(booking._doc.updatedAt)
     }
 }
 

module.exports = {
    transformBooking
}