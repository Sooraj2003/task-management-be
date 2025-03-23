const validator = require("validator")

const validateTask = (req)=>{

 const {dueDate,priority,status} = req.body;
    const format = 'YYYY-MM-DD';
    if(!validator.isDate(dueDate,format)){
        throw new Error("Invalid date type")
    }

    if(!["low","medium","high"].includes(priority.toLowerCase())){
        throw new Error("Invalid priority type")
    }
    if(!["pending","completed"].includes(status.toLowerCase())){
        throw new Error("Invalid status type")
    }
}

module.exports = validateTask;