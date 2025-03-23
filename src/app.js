const express = require("express")
const app = express();
const connectDb = require("./config/database")


//Connect to DB
connectDb().then(()=>{
   console.log("Database connected successfully");
}).then(()=>{
   //Listen on port 6000
   app.listen(6000,()=>{
      console.log("Server listening on port 6000");
   })
})
