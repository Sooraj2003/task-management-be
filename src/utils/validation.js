const validator = require('validator');

const validateSignUp = (req)=>{
    const {firstName,lastName,emailID} = req.body;

    if(!firstName || !lastName){
        throw new Error("Enter full name");
    }else if(firstName>=4 && firstName<=50){
        throw new Error("correct the length of name");
    }else if(!validator.isEmail(emailID.trim())){
        throw new Error("Invalid email")
    }
}
const validateTask = (req) => {
    const { dueDate, priority, status } = req.body;
    const format = 'YYYY-MM-DD';

    if (!dueDate || !validator.isDate(dueDate, format)) {
        throw new Error("Invalid date type");
    }

    if (!priority || !["low", "medium", "high"].includes(priority.toLowerCase())) {
        throw new Error("Invalid priority type");
    }

    if (!status || !["pending", "completed"].includes(status.toLowerCase())) {
        throw new Error("Invalid status type");
    }
};

module.exports = {
    validateSignUp,
    validateTask,
}