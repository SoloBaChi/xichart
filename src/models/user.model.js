const mongoose = require("mongoose")

const {Schema} = mongoose;

const userSchema = new Schema({
username:{
type:String,
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
// confirmPassword:{
// type:String,
// required:true
// },
setting:[

]
})

const User = mongoose.model("user",userSchema)
module.exports =  User;