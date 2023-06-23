import mongoose from "mongoose";

const user = new mongoose.Schema({
    FullName : {
        type : "String"
    },
    FatherName : {
        type : "String"
    },
    Email : {
        type : "String",
        unique : true
    },
    PhoneNumber : {
        type : "String",
    },
    Password : {
        type : "String"
    }
})

const userModel = mongoose.model('User', user);

export default userModel;