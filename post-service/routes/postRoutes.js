import { Router } from "express";
import { allFriendsPostsController, allPostsController, commentOnPostController, createPostController, deletePostController, likePostController } from "../controller/postController.js";
import { isAuth } from "../middleware/isAuth.js";


const router = Router()


// POST /api/create-post
// Content-Type: application/json
// Authorization: Bearer <token>

// {
//   "content": "This is a new post content"
// }

router.route('/create-post').post(isAuth,createPostController)


// GET /api/like/<postId>
// Authorization: Bearer <token>

router.route('/like/:postId').get(isAuth,likePostController)

// POST /api/add-comment
// Content-Type: application/json
// Authorization: Bearer <token>

// {
//   "content": "This is a new comment",
//   "postId": "<postId>"
// }

router.route('/add-comment').post(isAuth,commentOnPostController)

// POST /api/delete-post/<postId>
// Content-Type: application/json
// Authorization: Bearer <token>

router.route('/delete-post/:postId').post(isAuth,deletePostController)

// GET /api/all-post
// Content-Type: application/json
// Authorization: Bearer <token>

router.route('/all-post').get(isAuth,allPostsController)

// GET /api/all-friend-post
// Content-Type: application/json
// Authorization: Bearer <token>

router.route('/all-friend-post').get(isAuth,allFriendsPostsController)

export default router