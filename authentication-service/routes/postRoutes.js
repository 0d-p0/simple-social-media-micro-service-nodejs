import { Router } from "express";
import { addPostIdController, removePostIdController } from "../controller/userPostsController.js";
import { friendsInfoController } from "../controller/userController.js";

const postRoute = Router()

// POST /api/add-post-id
// Content-Type: application/json

// {
//   "userId": "userObjectId",
//   "savedPostId": "postObjectId"
// }

postRoute.route('/add-post-id').post(addPostIdController)

// POST /api/remove-post-id
// Content-Type: application/json

// {
//   "userId": "userObjectId",
//   "removedPostId": "postObjectId"
// }

postRoute.route('/remove-post-id').post(removePostIdController)

// POST /api/friends
// Content-Type: application/json

// {
//   "friendIds": ["friendObjectId1", "friendObjectId2"]
// }

postRoute.route('/friends').post(friendsInfoController)

export default postRoute