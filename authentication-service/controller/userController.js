import User from "../model/userModel.js";

export const friendsInfoController = async(req,res)=>{
try {
    
    const {friendIds}=req.body

    const friends = await User.find({ _id: { $in:friendIds } }).select("username posts");


    if(friends.length <= 0){
        return res.status(404).json({
            success:false,
            message:'no friend found'
        })
    }

    res.status(201).json({
        success:true,
        message:'all friend retrive successfully',
        friends
    })
} catch (error) {
    res.status(500).json({
        success:false,
        message:"some error occur please try again"
    })
}
}

