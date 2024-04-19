import mongoose from 'mongoose';

const { Schema } = mongoose;

// Post schema
const postSchema = new Schema({
  content: { type: String, required: true },
  image: { type: Buffer },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

// Define a pre-remove hook to delete associated comments
postSchema.pre('deleteOne', async function(next) {
  console.log("deleted one", this._conditions._id)
  try {
    // Delete all comments associated with this post
    await Comment.deleteMany({ post: this._conditions._id });
    next();
  } catch (error) {
    next(error);
  }
});

// Comment schema
const commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);

export { Post, Comment };
