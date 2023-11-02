
// import the response message class
const { model } = require("mongoose");
const ResponseMessage = require("./message.response");

const crudServices = {}


crudServices.createOne = model = async(req,res) => {
try{
const doc = await model.create({...req.body, createdBy:req.user._id});
if(!doc){
 return res.status(400).json(new ResponseMessage("error",400,"something went wrong!"))
}

return res.status(200).json(new ResponseMessage("sucess",200,"successfully created",{doc}))
}
catch(err){
return res.status(400).json("error",500,"INTERNAL SERVER ERROR")
}

}


crudServices.getOne = model = async(req,res) => {
try{
const doc = await model.findOne({createdBy:req.user._id,_id:req.params.id})
if(!doc){
return res.status(400).json(new ResponseMessage("error",400,"No match found"))
}
return res.status(200).json(new ResponseMessage("sucess",200,"successfully fetched",{doc}))

}catch(err){
return res.status(400).json("error",500,"INTERNAL SERVER ERROR")
}

}

crudServices.getMany = model = async(req,res) => {
try{
const docs = await model.find({createdBy:req.user._id})
if(!docs){
return res.status(400).json(new ResponseMessage("error",400,"No matches found"))
}
return res.status(200).json(new ResponseMessage("sucess",200,"successfully fetched",{docs}))
}catch(err){
return res.status(400).json("error",500,"INTERNAL SERVER ERROR")
}

}

crudServices.updateOne = model = async(req,res) => {
try{
const updateDoc = await model.findOneAndUpdate({createdBy:req.user._id,_id:req.params.id},req.body,{new:true})
if(!doc){
return res.status(400).json(new ResponseMessage("error",400,"update field does not exist"))
}
return res.status(200).json(new ResponseMessage("sucess",200,"successfully updated",{updateDoc}))

}catch(err){
return res.status(400).json("error",500,"INTERNAL SERVER ERROR")
}

}

crudServices.deleteOne = model = async(req,res) => {
try{
const reomvedDoc = await model.findOneAndRemove({createdBy:req.user._id,_id:req.params.id})
if(!reomvedDoc){
return res.status(400).json(new ResponseMessage("error",400,"delete field does not exist"))
}
return res.status(200).json(new ResponseMessage("sucess",200,"successfully removed",{reomvedDoc}))

}catch(err){
return res.status(400).json("error",500,"INTERNAL SERVER ERROR")
}

}

const crudControllers =  model => ({
createOne:crudServices.createOne(model),
getOne:crudServices.getOne(model),
getMany:crudServices.getMany(model),
updateOne:crudServices.updateOne(model),
removeOne:crudServices.deleteOne(model)
});

module.exports = crudControllers;
