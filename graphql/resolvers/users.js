const {fetchAllUser,createUser,login,fetchLoggedInUser}= require("../../service/user.service");

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
     },
     login : async args =>{
        try {

            console.log("user login",args)
            return login(args);
        } catch (error) {
            throw error;
        }
     },
     fetchLoggedInUser: async (args,req) =>{
        try {
            console.log("fetchLoggedInUser",req.isAuth)
            return fetchLoggedInUser(req.isAuth,req.userId);
        } catch (error) {
            throw error;
        }
     }

}