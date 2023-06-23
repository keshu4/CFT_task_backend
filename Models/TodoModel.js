import mongoose from "mongoose";

const todo = new mongoose.Schema({
    Email : {
        type : "String",
    },
    Item : {
        type : "String",
    },
})

const todoModel = mongoose.model('Todo', todo);

export default todoModel;