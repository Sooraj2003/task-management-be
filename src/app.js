const express = require("express")
const app = express();
const connectDb = require("./config/database");
const taskRouter = require("./routes/task");

// Middleware to convert json into javascript object
app.use(express.json())

//Routes
app.use("/",taskRouter)

//Connect to DB
connectDb().then(()=>{
   console.log("Database connected successfully");
}).then(()=>{
   //Listen on port 6000
   app.listen(6000,()=>{
      console.log("Server listening on port 6000");
   })
})
