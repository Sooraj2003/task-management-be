const mongoose = require("mongoose")

connectDb = async ()=>{
 await  mongoose.connect(process.env.MONGO_URL);
}

module.exports = connectDb;