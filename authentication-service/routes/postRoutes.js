import { Router } from "express";
import { addPostIdController, removePostIdController } from "../controller/userPostsController.js";
import { friendsInfoController } from "../controller/userController.js";

const postRoute = Router()


postRoute.route('/add-post-id').post(addPostIdController)
postRoute.route('/remove-post-id').post(removePostIdController)

postRoute.route('/friends').post(friendsInfoController)

export default postRoute