
const {dateToString} = require("./date");
const {userDetails} = require("../service/user.service");
const transformEvent = async (event) => {
    const userInformation= await userDetails(event._doc.creator);
    let data={
        ...event._doc,
        _id: event.id,
        date: dateToString(event._doc.date),
        creator: userInformation
    }
    return data;
}

module.exports = {
    transformEvent
}