
const express = require("express"),
      cors = require("cors"),
      morgan = require("morgan"),
      ResponseMessage = require("./utils/message.response"),
      userRouter = require("./routes/user.route"),
      postRouter = require("./routes/posts.route"),
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
res.status(200).json(new ResponseMessage("success",200,`Welcome to ${process.env.APP_NAME} API`));
});


// Auth Routes
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


//midlewares
app.use("/api/v1",protect);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/post",postRouter);



// Not found Route
app.use("*",(req,res)=>{
res.status(404).json(new ResponseMessage("error",400,"Not Found!"));
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