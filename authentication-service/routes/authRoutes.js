import { Router } from "express";
import { isUserExist, loginController, signUpController } from "../controller/authController.js";


const router = Router()

// POST /api/signup
// Content-Type: application/json

// {
//   "username": "exampleUser",
//   "password": "examplePassword"
// }

router.route('/signup').post(signUpController)

// POST /api/login
// Content-Type: application/json

// {
//   "username": "exampleUser",
//   "password": "examplePassword"
// }


router.route('/login').post(loginController)

//  GET /api/isUser/<userId>

router.route('/is-user/:userId').get(isUserExist)

export default router