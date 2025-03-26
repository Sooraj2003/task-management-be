const express = require("express")
const Task = require("../models/task")
const {validateTask} = require("../utils/validation")
const {userAuth} = require("../middlewares/auth");
const { adminAuth } = require("../middlewares/adminAuth");


// Creating a router for tasks
const taskRouter = express.Router();

//Create a task
taskRouter.post("/task/create",userAuth, async (req,res)=>{
    try{
        // Validate the data recieved from the body
        // validateTask(req);
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
        const {title,description,dueDate,priority} = req.body;  // Contains the fields to be updated
        
        
        const loggedInUser = req.user;

        const updatedTask = await Task.findOneAndUpdate({
            _id:id,
            userId:loggedInUser._id
        }, {
            title,
            description,
            dueDate,
            priority
        }, { new: true });
        
        console.log(updatedTask);
        
       

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        if(updatedTask.userId.toString()!== loggedInUser._id.toString()){
            res.status(401).json({
                errorMessage:"Invalid access"
            })
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
        const loggedInUser = req.user;

        const deletedTask = await Task.findOneAndDelete({
            _id:id,
            userId:loggedInUser._id

        });

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        if(deletedTask.userId.toString()!== loggedInUser._id.toString()){
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
        const loggedInUser = req.user;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { status: "completed" },
            { new: true } // Returns the updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        if(updatedTask.userId.toString()!== loggedInUser._id.toString()){
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

// 🚀 New Admin Route: Fetch all users' tasks
taskRouter.get("/admin/tasks", userAuth, adminAuth, async (req, res) => {
    try {
        const tasks = await Task.find({}).populate("userId");

        if (!tasks) throw new Error("Tasks not found - db find error");
        if (tasks.length === 0) throw new Error("No tasks available");

        res.json({
            message: "All users' tasks retrieved successfully",
            tasks
        });
    } catch (err) {
        res.status(400).json({ errorMessage: err.message });
    }
});
//Admin task upadate api
taskRouter.patch("/admin/task/:taskId", userAuth, adminAuth, async (req, res) => {
    try {
        const { taskId } = req.params;
        const updateFields = req.body; // Only update provided fields

        // Find and update the task
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateFields, {
            new: true, // Return updated document
        });

        if (!updatedTask) {
            return res.status(404).json({ errorMessage: "Task not found" });
        }

        res.json({
            message: "Task updated successfully",
            task: updatedTask,
        });
    } catch (err) {
        res.status(400).json({ errorMessage: err.message });
    }
});

//Admin - delete a task
taskRouter.delete("/admin/task/:taskId", userAuth, adminAuth, async (req, res) => {
    try {
        const { taskId } = req.params;

        // Find and delete the task
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ errorMessage: "Task not found" });
        }

        res.json({
            message: "Task deleted successfully",
            task: deletedTask, // Optional: Return deleted task details
        });
    } catch (err) {
        res.status(400).json({ errorMessage: err.message });
    }
});

// Mark task as complete (Admin)
taskRouter.patch('/admin/task/complete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find and update task
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { status: 'completed' },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task marked as completed', task: updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = taskRouter