import express from "express";
import auth from "../Utils/auth.js";
import { userRegisterController, userLoginController, todoAddController, todoGetController, todoDeleteController } from "../Controllers/index.js";
const router = express.Router();
router.post('/register', userRegisterController);
router.post('/login', userLoginController);
router.post('/todo',auth, todoAddController);
router.get('/todo', auth, todoGetController);
router.delete('/todo', auth, todoDeleteController);

export default router;