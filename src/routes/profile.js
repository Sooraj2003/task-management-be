const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");


profileRouter.get("/profile",userAuth,async (req,res)=>{
    try{
      const user = req.user;
         res.json({
            message:"User sent sucessfully",
            user:user
         });
    }
    catch(err){
      res.status(400).send("Error : "+err.message)
    }
    
    
  })


  module.exports = profileRouter