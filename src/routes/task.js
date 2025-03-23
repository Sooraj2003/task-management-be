const express = require("express")
const Task = require("../models/task")
const {validateTask} = require("../utils/validation")
const {userAuth} = require("../middlewares/auth")


// Creating a router for tasks
const taskRouter = express.Router();

//Create a task
taskRouter.post("/task/create",userAuth, async (req,res)=>{
    try{
        // Validate the data recieved from the body
        validateTask(req);
        const loggedInUser = req.user;
        const {title,description,dueDate,priority,status} = req.body;
        const task = new Task({
            userId:loggedInUser._id,
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

//Get the tasks
taskRouter.get("/tasks",userAuth,async (req,res)=>{
    try{
     const loggedInUser = req.user;
     const {_id} = loggedInUser;
     const tasks = await Task.find({
        userId:_id
     });
     //Checking if tasks is defined
     if(!tasks){
        throw new Error("Tasks is not found - db find error")
     }
     //Checking if tasks is empty
     if(tasks.length==0){
        throw new Error("Tasks is empty");
     }

     res.json({
        message:"Tasks data",
        tasks:tasks
     })
    }catch(err){
      res.status(400).json({
        errorMessage:err.message
      })
    }
})

//Update the particular task
taskRouter.patch("/task/update/:id",userAuth, async (req, res) => {
    try {
        //Validate the body
        validateTask(req);
        const { id } = req.params;
        const updates = req.body;  // Contains the fields to be updated

        const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });

        if(updatedTask.userId!== loggedInUser._id){
            res.status(401).json({
                errorMessage:"Invalid access"
            })
        }

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({
            message: "Task updated successfully",
            task: updatedTask
        });

    } catch (err) {
        res.status(400).json({ errorMessage: err.message });
    }
});

//Deleta a task
taskRouter.delete("/task/delete/:id",userAuth, async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        if(deletedTask.userId!== loggedInUser._id){
            res.status(401).json({
                errorMessage:"Invalid access"
            })
        }

        res.json({
            message: "Task deleted successfully",
            task: deletedTask
        });

    } catch (err) {
        res.status(400).json({ errorMessage: err.message });
    }
});

//Mark as complete - a particular task
taskRouter.patch("/task/complete/:id",userAuth, async (req, res) => {
    try {
        const { id } = req.params;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { status: "completed" },
            { new: true } // Returns the updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        if(updatedTask.userId!== loggedInUser._id){
            res.status(401).json({
                errorMessage:"Invalid access"
            })
        }

        res.json({
            message: "Task marked as completed",
            task: updatedTask
        });

    } catch (err) {
        res.status(400).json({ errorMessage: err.message });
    }
});



module.exports = taskRouter