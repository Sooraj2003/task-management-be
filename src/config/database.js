const mongoose = require("mongoose")

connectDb = async ()=>{
 await  mongoose.connect("mongodb+srv://soorajnp:grg72muT1zVmfGjO@cluster0.qu5h6.mongodb.net/taskManagement?retryWrites=true&w=majority&appName=Cluster0")
}

module.exports = connectDb;