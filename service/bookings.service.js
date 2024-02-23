
const Booking = require("./../models/booking");
const Event= require("./../models/event")

const {transformBooking} = require("../utils/bookingUtils");

const {transformEvent} = require("../utils/eventUtils");
const bookEvent=async (eventId,userId)=>{
    try {
        const existingEvent = await Event.findOne({ _id:eventId});
        if (!existingEvent) {
            throw new Error("Event not found");
        }
        const booking = new Booking({
            user: userId,
            event: existingEvent._id
        });

        const savedBooking = await booking.save();
        return await transformBooking(savedBooking);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const cancelBooking=async (bookingID)=>{
    try {
        const existingBooking = await Booking.findOne({ _id: bookingID }).populate('event');
        if (!existingBooking) {
            throw new Error("Booking not found");
        }

        await Booking.deleteOne({ _id: bookingID });
        console.log(`fetching event information for ${existingBooking.event}`);

        return await transformEvent(existingBooking.event);

    } catch (error) {
        throw error;
    }
}

const fetchAllBooking = async () =>{
    try {
        const bookingList = await Booking.find();
        const data= await Promise.all(bookingList.map(async (booking) => transformBooking(booking)));
        return data;
    } catch (error) {

        console.log(error, "this is the error while  fetching bookings");
        throw error;
    }
}

module.exports={
    bookEvent,
    cancelBooking,
    fetchAllBooking
}