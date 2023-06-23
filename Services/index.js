import userModel from '../Models/UserModel.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import todoModel from '../Models/TodoModel.js';

const userRegisterService = async (userData) => {
    const {FullName, FatherName, Email, PhoneNumber, Password} = userData;
    const x = await userModel.findOne({Email : Email})
    if(x) throw { message : "user already exist", statusCode : 409}
    const salt = bcrypt.genSaltSync(10);
    const pwd = bcrypt.hashSync(Password, salt);
    const tmpUser = new userModel({
        FullName, FatherName, Email, PhoneNumber, Password : pwd
    })
    tmpUser.save();
    return {message : "user Registered Successfully", statusCode : 201}
}

const userLoginService = async (loginData) => {
    try {
    const {Email, Password} = loginData;
    const x = await userModel.findOne({Email : Email})
    if(!x) throw { message : "user does not exist", statusCode : 404}
    if(Password) {
        if(!bcrypt.compare(Password, x.Password)) {
            throw { message : "password did not match", statusCode : 400}
        }
    }
    delete x.Password;
    const jwtToken = jwt.sign({
        userEmail : x.Email,
        userName : x.FullName
    }, 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', {expiresIn : '15d', algorithm : 'HS256'});
    return {message : "user Logged In Successfully", statusCode : 201, data : {...x}, token : jwtToken}
    }
    catch(err) {
        return err;
    }
}

const todoAddService = async (userData) => {
    const {Email, Item} = userData;
    const x = await userModel.findOne({Email : Email})
    if(!x) throw { message : "user does not exist", statusCode : 404}
    const tmpTodo = new todoModel({
        Email,
        Item
    });
    await tmpTodo.save();
    return {message : "todo Added Successfully", statusCode : 201}
}

const todoGetService = async (params) => {
    const { Email, page } = params;
    console.log('test44', Email)
    const startPage = (page -1)*3;
    const endPage = (page)*3;
    const totalCount = await todoModel.countDocuments({Email : Email}) 
    let pagination = {};
    if(endPage < totalCount){
    pagination.next = {
    next: page + 1,
    limit:3
    }
    }
    if(startPage > 0){
    pagination.previous = {
    previous:page - 1,
    limit:3
    }
    }
    const TodoItems = await todoModel.find({Email : Email}, {Email : 0}).skip(startPage).limit(3);
    return {message : "Successful", data : TodoItems, statusCode : 201, count : totalCount}
}

const todoDeleteService = async (params) => {
    const { id } = params;
    console.log('test55', id);
    await todoModel.findOneAndRemove({_id : id})
    return {message : "Item deleted Successfully", statusCode : 201}
}

export { userRegisterService, userLoginService, todoAddService, todoGetService, todoDeleteService}