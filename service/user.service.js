
const User = require("../models/user");

const bcrypt = require('bcryptjs');

const eventUtils= require("../utils/eventUtils");
const Event = require("../models/event");

const jwt= require("jsonwebtoken");

// fetch the user information from the database
const userDetails = async (userId) => {

    try {
        const userInfo = await User.findById(userId);
        return { ...userInfo._doc, _id: userInfo.id }
    } catch (error) {
        throw error;
    }
}


const fetchAllUser = async () => {
    try {
        const userList = await User.find();
        return userList.map(async (user) => {
            let createdEvents=[];
            if(user._doc.createdEvents){
                console.log(user._doc.createdEvents, typeof user._doc.createdEvents);
                createdEvents = user._doc.createdEvents.map(async event=>{
                    const eventDetails= await Event.findById(event);
                    return eventUtils.transformEvent(eventDetails);
                });
            }
            // createdEvents= await eventUtils.transformEvent(user._doc.createdEvents);
            return { ...user._doc, password: null, createdEvents:createdEvents };
        });
    } catch (error) {
        throw error;
    }
}

const findUserById = async userId => User.findById(userId);


const createUser = async (user) => {
    try {
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
            throw new Error('User exists already');
        }
        const hashedPassword = await bcrypt.hash(user.password, 12);
        let newUser = new User({
            email: user.email,
            password: hashedPassword
        });
        newUser = await newUser.save();
        return { ...newUser._doc, _id: newUser.id, password: null };
    } catch (error) {
        throw error;
    }
}


const login = async ({email,password}) =>{
    
    try {
        const user = await User.findOne({email:email});

    if(!user){
        throw new Error("Invalid Username");
    }
    const isEqual= await bcrypt.compare(password,user.password);
     if(!isEqual){
        throw new Error("Incorrect password")
     }
     
      const token= jwt.sign({userId:user.id,email:user.email},process.env.JWT_SECRET_KEY,{expiresIn:'1h'});

      return {
        userId:user.id,
        token:token,
        tokenExpiration:1
      }
    } catch (error) {
        throw error;    
    }

}

const fetchLoggedInUser = async (isAuth,userId) => {
    if(isAuth){
        throw new Error("Unauthenticated");
    }
    return {
        userId
    }
   
}
module.exports = {
    userDetails,
    findUserById,
    fetchAllUser,
    createUser,
    login,
    fetchLoggedInUser
}