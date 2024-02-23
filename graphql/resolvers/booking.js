
const {bookEvent:reserveTicket,cancelBooking:cancelTicket, fetchAllBooking}= require("./../../service/bookings.service");

module.exports ={
    reserveTicket: async (args) =>{
        try {
            return reserveTicket(args.eventId,"65d811637e8a9c69640e72b4");
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