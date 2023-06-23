import { userRegisterService, userLoginService, todoAddService, todoGetService, todoDeleteService } from "../Services/index.js";

const userRegisterController = async(req, res, next) => {
    try {
        console.log('ENTERED ------> ');
        const response = await userRegisterService(req.body);
        res.json(response);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

const userLoginController = async(req, res, next) => {
    try {
        const response = await userLoginService(req.body);
        res.json(response);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

const todoAddController = async(req, res, next) => {
    try {
        console.log('ENTERED ------> ');
        const response = await todoAddService(req.body);
        res.json(response);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

const todoGetController = async(req, res, next) => {
    try {
        console.log('ENTERED ------> ');
        const response = await todoGetService(req.query);
        res.json(response);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

const todoDeleteController = async(req, res, next) => {
    try {
        console.log('ENTERED ------> ');
        const response = await todoDeleteService(req.query);
        res.json(response);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}


export {userRegisterController, userLoginController, todoAddController, todoGetController, todoDeleteController}