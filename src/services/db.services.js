
const mongoose = require("mongoose");

dbService = {}
dbService.connectDatabase = async() => {
const URI = process.env.DATA_BASE_URL;
try{
const params = {
useNewUrlParser:true,
useUnifiedTopology:true
}
const connect = await mongoose.connect(URI,params);
console.log(`successfully connected ${connect.connection.host} database`)
}
catch(err){
console.log(`could not connect to database ${err}`)
}

}

module.exports = dbService;