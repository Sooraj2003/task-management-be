const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema =  mongoose.Schema({
   firstName:{
    type:String,
    required:true,
    minLength:2
   },
   lastName:{
    type:String,
    required:true
   },
   emailID:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
         throw new Error("Invalid Email")
      }
    }
   },
   password:{
    type:String,
    required:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
         throw new Error("Not a strong password")
      }
    }
   },
  
},{timestamps:true})

 userSchema.methods.getJwt = async function(){
   const user = this;
   const jwtToken = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
   return jwtToken;
 }

 userSchema.methods.comparePassword = async function(passwordInputByUser){
   const user = this;
   const passwordHash = user.password;
   const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);

   return isPasswordValid;
 }

const User = mongoose.model("User",userSchema);

module.exports=User;