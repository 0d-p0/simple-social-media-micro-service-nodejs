import mongoose from 'mongoose'


const Schema = mongoose.Schema;

// User schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId }]
});

 const User = mongoose.model('User', userSchema);

export default User
