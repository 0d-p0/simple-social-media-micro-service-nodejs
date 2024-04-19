import { Router } from "express";
import { addFriendController, getAllFriendsController } from "../controller/friendController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = Router()


router.route('/add-friend').post(isAuth, addFriendController)
router.route('/all-friend').get(isAuth,getAllFriendsController)

export default router