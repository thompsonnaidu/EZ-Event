const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const bookingSchema= new mongoose.Schema({
    event: {
        type:Schema.Types.ObjectId,
        ref:'Event'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true});

module.exports= mongoose.model('Booking',bookingSchema);