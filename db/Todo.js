const mongoose= require("mongoose");
const todoSchema= new mongoose.Schema({
    task: String,
    subTask: String
})

module.exports= mongoose.model("todos",todoSchema)