
const mongoose = require("mongoose");
const { Schema} = mongoose;

const PostSchema = new Schema({
title:{
type:String,
required:true,
maxlength:50
},
description:{
type:String,
maxlength:150
},
likes:{
type:Number
},
createdBy:{
type:mongoose.SchemaTypes.ObjectId,
ref:"user",
required:true
},
},
{timestamps:true}
);

const Post = mongoose.model("post",PostSchema);

module.exports = Post;