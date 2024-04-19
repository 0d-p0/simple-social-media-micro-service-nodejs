import { Router } from "express";
import { addFriendController, getAllFriendsController } from "../controller/friendController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = Router()

// POST /add-friend
// Content-Type: application/json
// Authorization: Bearer <token>

// {
//   "recipient": "<recipientId>"
// }

router.route('/add-friend').post(isAuth, addFriendController)


// GET /all-friend
// Content-Type: application/json
// Authorization: Bearer <token>

router.route('/all-friend').get(isAuth,getAllFriendsController)

export default router