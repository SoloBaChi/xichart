
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


// Protect Middleware
auth.protect = async(req,res,next) => {
// check if the bearer token exist
const bearer = req.headers.authorization;
if(!bearer || !bearer.startsWith("Bearer ")){
return res.status(401).json(new ResponseMessage("error",401,"Don't have an account !"))
}

// get the token
let token = await bearer.split(" ")[1];
if(token === undefined){
return res.status(401).json(new ResponseMessage("error",401,"Token does not exist!"))
}

// decode the bearer token
let decodedToken;
try{
decodedToken = await verifyToken(token);
}
catch(err){
return res.status(401).json(new ResponseMessage("error",401,"Authorized token"))
}
if(!decodedToken){
return res.status(401).json(new ResponseMessage("error",401,"Invalid token"));
}

// Extract the user by getting the payload id
const userId = decodedToken.id;

// confirm that the user Id is invalid
if(!userId){
return res.status(401).json(new Response("error",401,"Invalid token"))
}

const user = await userServices.fetchOne({_id:userId});
if(!user){
return res.status(401).json(new Response("error",401,"Unauthorized Request! Sign In Or SignUp!. If you are already signed in, please logout and login again"))    
}

req.user = user;

next();
}


module.exports = auth;