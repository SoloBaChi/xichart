
const userServices = require("../services/user.services");
const ResponseMessage = require("../utils/message.response");


const userDetails = {}

// get the user profile
userDetails.myProfile = async(req,res) => {

try{
const {username,email,password,_id:id} = req.user;
return res.status(200).json(new ResponseMessage("success",201,`${username ? username : email.split("").slice(0,6).join("")} profile`,{username,email,password,id}));
}
catch(err){
return res.status(400).json(new ResponseMessage("error",500,"INTERNAL SERVER ERROR"))
}

}


// update user pofile
userDetails.updateProfile = async(req,res) => {
try{
const user = await userServices.update({_id:req._id},req.body);
return res.status(200).json(new ResponseMessage("success",200,"user updated succefully",{user}))
}
catch(err){
return res.status(400).json(new ResponseMessage("error",500,"INTERNAL SERVER ERROR"))
}
}

module.exports = userDetails;