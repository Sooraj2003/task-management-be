const express = require("express")
const Task = require("../models/task")
const validateTask = require("../utils/validateTask")


// Creating a router for tasks
const taskRouter = express.Router();

//Create a task
taskRouter.post("/task/create", async (req,res)=>{
    try{
        // Validate the data recieved from the body
        validateTask(req);
        const {title,description,dueDate,priority,status} = req.body;
        const task = new Task({
            title,
            description,
            dueDate,
            priority,
            status
        })
       // Save the instance into the DB
        await task.save();

        res.json({
            message:"Task created successfully",
            task:task
        })

    }catch(err){
        //Handle the error
        res.status(400).json({
            errorMessage:err.message
        })

    }
})


module.exports = taskRouter