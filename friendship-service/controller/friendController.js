import Friendship from "../model/friendshipModel.js";
import  axios from 'axios'
// Controller to add a friend
export const addFriendController = async (req, res) => {
  try {

    const userId = req.user
    const { recipient } = req.body;
    if(!recipient){
        return res.status(303).json({
            success:false,
            message : " recipient is required"
        })
    }

    // Check if the friendship already exists
    const existingFriendship = await Friendship.findOne({ requester : userId, recipient });
    if (existingFriendship) {
      return res.status(400).json({
        success: false,
        message: "Friendship already exists",
        existingFriendship
      });
    }

    // Create a new friendship
    const friendship = new Friendship({ requester : userId, recipient });
    await friendship.save();

    res.status(201).json({
      success: true,
      message: "Friend added successfully",
      friendship,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred, please try again",
      error: error.message,
    });
  }
};

// Controller to remove a friend
export const removeFriendController = async (req, res) => {
  try {
    const { requester, recipient } = req.body;

    // Check if the friendship exists
    const friendship = await Friendship.findOneAndDelete({ requester, recipient });
    if (!friendship) {
      return res.status(404).json({
        success: false,
        message: "Friendship not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Friend removed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred, please try again",
      error: error.message,
    });
  }
};


// Controller to get all friends of a user
export const getAllFriendsController = async (req, res) => {
  try {
    const userId  = req.user;

    // Find all friendships where the user is the requester or recipient
    const friendships = await Friendship.find({ $or: [{ requester: userId }, { recipient: userId }] });

    // Extract friend IDs from friendships
    const friendIds = friendships.map(friendship => {
      if (friendship.requester.toString() === userId) {
        return friendship.recipient.toString();
      } else {
        return friendship.requester.toString;
      }
    });


    try {
        const response = await axios.post('http://localhost:5000/api/friends',{
            friendIds
        })
    
        if(!response.data.success){
           return res.status(404).json({
            success:false,
            message:response?.data?.message
           })
        }


      return  res.status(200).json({
            success: true,
            message: "Successfully retrieved friends",
            friends:response.data.friends
          });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return res.status(404).json({
            success: false,
            message: error.response.data.message||"User not found",
          });
        }
        // Handle other errors related to the axios request
        return res.status(500).json({
          success: false,
          message: "Error occurred while checking user existence",
          error: error.message,
        });
      }


    res.status(200).json({
      success: true,
      message: "some thing wen wrong",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred, please try again",
      error: error.message,
    });
  }
};

