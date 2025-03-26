const express = require("express")
require('dotenv').config()
const connectDb = require("./config/database");
const taskRouter = require("./routes/task");
const authRouter = require("./routes/auth");
const cookieParser = require("cookie-parser");
const profileRouter = require("./routes/profile");
const cors = require("cors");

const app = express();

// Middleware to convert json into javascript object
app.use(express.json())
//Middleware to parse cookie
app.use(cookieParser());

app.use(cors({
   origin:"http://localhost:5173",
   credentials:true
}));

//Routes
app.use("/",taskRouter)
app.use("/",authRouter)
app.use("/",profileRouter)

//Connect to DB
connectDb().then(()=>{
   console.log("Database connected successfully");
}).then(()=>{
   //Listen on port 
   app.listen(process.env.PORT,()=>{
      console.log("Server listening on port "+process.env.PORT);
   })
})
