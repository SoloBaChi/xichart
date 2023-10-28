
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validationResult = require("express-validator").validationResult;


// import user services
const userServices = require("../services/user.services");
const ResponseMessage = require("./message.response");


// Define some funtions
const newToken = user => jwt.sign({id:user._id},process.env.SECRET_KEY);

const verifyToken = token => jwt.verify(token,process.env.SECRET_KEY)


const auth = {}

auth.signUp = async(req,res) =>{
// check client errors thrown by express validator
const errors = validationResult(req);
if(!errors.isEmpty()){
 return res.status(400).json({
 status:"error",
 statusCode:400,
 message:errors.array(),
 })
}
try{
// check if the email exist
const { email,password} = req.body;
const existingUser =  await userServices.fetchOne({email:email});
if(existingUser){
return res.status(400).json(new ResponseMessage("error",400,"email already exist"))
}

// hash the user's password
const hashedPassword = await bcrypt.hash(password,10);

// create user
const user  = await userServices.create({...req.body,password:hashedPassword})

// generate token an access token
const token = await newToken(user);
return res.status(201).json(new ResponseMessage("success",200,"account created successfully",{token,user}))

}
catch(error){
return res.status(400).json(new ResponseMessage("error",500,"INTERNAL SERVER ERROR"))
}

}



auth.signIn = async(req,res) =>{
// check client errors thrown by express validator
const errors = validationResult(req);
if(!errors.isEmpty()){
 return res.status(400).json({
 status:"error",
 statusCode:400,
 message:errors.array(),
 })
}
try{
//check if the email exist
const { email,password } = req.body;
const existingUser = await userServices.fetchOne({email:email});
if(!existingUser){
return res.status(400).json(new ResponseMessage("error",400,"invalid email"));
}
// check if the password matches
const isCorrectPassword = await bcrypt.compare(password,existingUser.password);
if(!isCorrectPassword){
return res.status(400).json(new ResponseMessage("error",400,"invalid password"))
}

// generate token an access token
const token = await newToken(existingUser);

return res.status(201).json(new ResponseMessage("success",201,{token}))
}
catch(error){
return res.status(400).json(new ResponseMessage("error",400,"INTERNAL SERVER ERROR"))
}
}


auth.protect = async(req,res) => {
// check if the bearer token exist


}


module.exports = auth;