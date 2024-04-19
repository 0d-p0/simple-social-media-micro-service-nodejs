import { Comment, Post } from "../model/postmodel.js";
import axios from 'axios'


export const createPostController = async (req, res) => {
  try {
    
    const  userId  = req.user;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Post content is required",
      });
    }

    const post = new Post({
      content,
      author: userId,
      // ...(req.file && { image: req.file.buffer }),
    });

      try {
        const response = await axios.post('http://localhost:5000/api/add-post-id',{
          userId,
          savedPostId:post?._id
        })
    
    
        if(!response.data.success){
           return res.status(404).json({
            success:false,
            message:response?.data?.message
           })
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
        // Handle other errors related to the axios request
        return res.status(500).json({
          success: false,
          message: "Error occurred while checking user existence",
          error: error.message,
        });
      }

    await post.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: "Some error occurred, please try again",
      error: error.message,
    });
  }
};




export const likePostController = async (req, res) => {
  try {
    const { postId } = req.params;
    console.log(req.params)
    const userId = req.user;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if the user has already liked the post
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      return res.status(400).json({
        success: false,
        message: "You have already liked this post",
      });
    }

    // Add the user's ID to the likes array
    post.likes.push(userId);
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post liked successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred, please try again",
      error: error.message,
    });
  }
};



export const commentOnPostController = async (req, res) => {
  try {
    // const { postId } = req.params;
    const userId = req.user;
    const { content,postId } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Comment content is required",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comment = new Comment({
      content,
      author: userId,
      post: postId,
    });

    const savedComment = await comment.save();

    // Add the comment ID to the post's comments array
    post.comments.push(savedComment._id);
    await post.save();

    res.status(201).json({
      success: true,
      message: "Comment posted successfully",
      comment: savedComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred, please try again",
      error: error.message,
    });
  }
};



// Controller for deleting a post
export const deletePostController = async (req, res) => {
  try {
    // Extract post ID from request parameters
    const { postId } = req.params;
    const  userId  = req.user;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }


  
    if (post.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }


    try {
      const response = await axios.post('http://localhost:5000/api/remove-post-id',{
        userId,
        removedPostId:post?._id
      })
  
       console.log("hjkhjkhmkhjkm",response.data)
      if(!response.data.success){
         return res.status(404).json({
          success:false,
          message:response?.data?.message
         })
      }
    } catch (error) {
      console.log("error is = ",  error.response.data.message)
      if (error.response && error.response.status === 404) {
        return res.status(404).json({
          success: false,
          message:  error.response.data.message || "User not found",
        });
      }
      // Handle other errors related to the axios request
      return res.status(500).json({
        success: false,
        message: "Error occurred while checking user existence",
        error: error.message,
      });
    }    
    
    // Delete the post
    await Post.deleteOne({ _id: postId });

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred, please try again",
      error: error.message,
    });
  }
};


export const allPostsController = async (req,res)=>{
  try {
    const userId = req.user
    const posts = await Post.find({ author: userId });
    if(posts.length==0){
      return res.status(400).json({
        success:false,
        message:"no post found"
      })
    }
    res.status(201).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred, please try again",
      error: error.message,
    });
  }
}



export const allFriendsPostsController = async (req,res)=>{
  try {
    const userId = req.user
    const token = req.token
    const response = await axios.get('http://localhost:5002/api/all-friend',{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
  
    if(!response.data.success){
       return res.status(404).json({
        success:false,
        message:response?.data?.message
       })
    }
   const friendlist =response.data.friends.map(user=>user._id)


   const posts = await Post.find({ author: {$in:friendlist} });
 
     res.send(posts)


  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: error.response.data.message||"User not found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Some error occurred, please try again",
      error: error.message,
    });
  }
}
