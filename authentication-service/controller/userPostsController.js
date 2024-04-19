import User from "../model/userModel.js"

export const addPostIdController = async (req, res) => {
  try {
    const { userId, savedPostId } = req.body;

    if (!userId || !savedPostId) {
      return res.status(400).json({
        success: false,
        message: "userId and savedPostId are required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.posts.push(savedPostId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Post id added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred, please try again",
      error: error.message,
    });
  }
};



export const removePostIdController = async (req, res) => {
  try {
    const { userId, removedPostId } = req.body;

    console.log(userId,removedPostId)

    if (!userId || !removedPostId) {
      return res.status(400).json({
        success: false,
        message: "userId and removedPostId are required",
      });
    }


    const user = await User.findById(userId);


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the index of the removed post ID in the user's list of posts
    const index = user.posts.indexOf(removedPostId);
    console.log(user.posts)
    console.log("index is ",index)
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Post ID not found in user's list",
      });
    }

    // Remove the post ID from the user's list of posts
    user.posts.splice(index, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Post ID removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred, please try again",
      error: error.message,
    });
  }
};
