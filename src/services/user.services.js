
const UserModel = require("../models/user.model")


class UserServices{
// create a user
async create(userData){
return UserModel.create({userData})
}

// update a user
async update(filter,userData){
return UserModel.findOneAndUpdate(filter,userData,{new:true})
}

// delete a user
async delete(filter){
return UserModel.findByIdAndDelete(filter)
}

// get a user
async get(filter){
return UserModel.findOne(filter)
}
}

module.exports = new UserServices();