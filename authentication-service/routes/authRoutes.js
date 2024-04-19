import { Router } from "express";
import { loginController, signUpController } from "../controller/authController.js";


const router = Router()


router.route('/signup').post(signUpController)
router.route('/login').post(loginController)

export default router