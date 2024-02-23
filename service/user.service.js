
const User = require("../models/user");
// fetch the user information from the database
const userDetails = async (userId) => {

    try {
        const userInfo = await User.findById(userId);
        return { ...userInfo._doc, _id: userInfo.id }
    } catch (error) {
        throw error;
    }
}

const findUserById = userId => User.findById(userId);
module.exports = {
    userDetails,
    findUserById
}