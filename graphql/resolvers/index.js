const Event = require('./../../models/event');
const User=require("./../../models/user");
const bcrypt = require('bcryptjs');

// fetch the user information from the database
const user= userId =>{
    return User.findById(userId).then(userInfo=> {
        return {...userInfo._doc, _id:userInfo.id}
    }).catch(err=>{throw err;})
}

//fetch the event information from the database
const eventDetails=eventIds=>{
    return Event.find({_id:{$in:eventIds}}).then(eventList=>{
        return eventList.map(event=>{
            return {...event._doc,
            creator:user.bind(this,event.creator)};
        });
    }).catch(err=>{throw err;})

    
} 
// exporting the root resolver
module.exports={
    events: () => {
        
        return Event.find().then((eventList)=>{
            return eventList.map(event => {
                return {...event._doc,
                creator:user.bind(this,event._doc.creator)};
            });
        }).catch(err => {console.log(err); throw err;})
        
    },
    users: () => {
        return User.find().then((userList)=>{
            return userList.map(user => {
                return {...user._doc,password:null,createdEvents:eventDetails.bind(this,user._doc.createdEvents)};
            });
        }).catch(err => {console.log(err); throw err;})
        
    },
    createEvent: (args) => {
        const newEvent = new Event({
            title: args.event.title,
            description: args.event.description,
            price: +args.event.price,
            date: args.event.date,
            creator: args.event.creator
        });
        let createdEvent=null;  
        return newEvent.save().then(result => {
            createdEvent=result;
            return User.findById(args.event.creator);
            
        }).then((user)=>{
            if(!user){
                throw new Error('User not found');
            }
            user.createdEvents.push(newEvent);
            return user.save(); 
        }).then((updatedUser)=> createdEvent).catch(err => {
            console.log(err);
            throw err;
        });
        
    },

    createUser: (args) => {
        console.log(args,"this are the args");

        return User.findOne({email:args.user.email}).then(user => {
            if(user){
                throw new Error('User exists already.');
            }
            
            return bcrypt.hash(args.user.password, 12);
        }).then(hashedPassword => {
            const newUser = new User({
                email: args.user.email,
                password: hashedPassword
            });

            return newUser.save()
        }).then(result => {
            console.log(result);
            return {...result._doc,_id:result.id, password:null};
        }).catch(err => {
            console.log(err); 
            throw err;});
        
        
    } 
}