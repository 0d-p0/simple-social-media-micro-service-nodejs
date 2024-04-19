import { Router } from "express";
import { commentOnPostController, createPostController, deletePostController, likePostController } from "../controller/postController.js";
import { isAuth } from "../middleware/isAuth.js";


const router = Router()


router.route('/create-post').post(isAuth,createPostController)
router.route('/like/:postId').get(isAuth,likePostController)
router.route('/add-comment').post(isAuth,commentOnPostController)
router.route('/delete-post/:postId').post(isAuth,deletePostController)

export default router