const {fetchAllUser,createUser}= require("../../service/user.service");

module.exports ={
     retrieveAllUser: async args =>{
        try {
            return fetchAllUser();
        } catch (error) {
            throw error;
        }
     },
     createUser : async args =>{
        try {
            return createUser(args.user);
        } catch (error) {
            throw error;
        }
     }
}