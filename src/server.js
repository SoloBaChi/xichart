
const express = require("express"),
      cors = require("cors"),
      morgan = require("morgan"),
      {urlencoded,json} = require("body-parser"),
      {connectDatabase}  = require("./services/db.services"),
      {signUp,signIn,protect} = require("./utils/auth"),
      {body} = require("express-validator");

require("dotenv").config()


// create an app
const app = express();

// basic middlewares
app.use(cors({origin:"*", credentials:true}));
app.use(urlencoded({extended:true}));
app.use(json());


// ////ROUTES///////
// Default Route
app.get("/",(req,res)=>{
res.status(200).json({
 status:"sucess",
 statusCode:200,
 message:`Welcome to ${process.env.APP_NAME} API`
});
});


// other Routes
app.post("/register",
body("email").isEmail().withMessage("please enter a valid email address"),
  body("password")
    .isStrongPassword({
      minLength: 8,
    })
    .withMessage(`Password must be 8 characters length`),
signUp);
app.post("/login",
body("email").isEmail().withMessage("please enter a valid email address"),
  body("password")
    .isStrongPassword({
      minLength: 8,
    })
    .withMessage(`Password must be 8 characters length`),
signIn)


// Not found Route
app.use("*",(req,res)=>{
res.status(404).json({
status:"error",
statusCode:404,
message:"Not found!"
})
});




// get the port
const port = process.env.PORT || 4000;

// start the server
const start = async() => {

//start the database
await connectDatabase();

app.listen(port,()=>{
console.log(`server started at localhost:${port}`);
})
}


module.exports =  start;