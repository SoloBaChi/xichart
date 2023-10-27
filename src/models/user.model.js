const mongoose = require("mongoose")

const {Schema} = mongoose;

const userSchema = new Schema({
firstName:{
type:String,
required:true,
trim:true,
},
lastName:{
type:String,
required:true,
trim:true,
},
email:{
type:String,
unique:true,
required:true,
},
password:{
type:String,
required:true
},
confirmPassword:{
type:String,
required:true
},
username:{
type:String
},
setting:[

]
})

const User = mongoose.model("user",userSchema)
module.exports =  User;