
const user = require("../../models/user");
const {bookEvent:reserveTicket,cancelBooking:cancelTicket, fetchAllBooking}= require("./../../service/bookings.service");

module.exports ={
    reserveTicket: async (args) =>{
        try {
            const existingUser= await user.findById(args.userId);
            if(existingUser){
                return reserveTicket(args.eventId,args.userId);
            }
             throw new Error("invalid user Id passed");
        } catch (error) {
            throw error;
        }
    },

    cancelTicket: async (args)=>{
        try {
            return cancelTicket(args.bookingID);
        } catch (error) {
            throw error;
        }
    },
    bookings: async () =>{
        try {
         return await fetchAllBooking();
        } catch (error) {
            throw error;
        }
    }
}