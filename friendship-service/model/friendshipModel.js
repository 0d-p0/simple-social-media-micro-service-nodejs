import mongoose from 'mongoose';

const { Schema } = mongoose;

// Friendship schema
const friendshipSchema = new Schema({
  requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Friendship = mongoose.model('Friendship', friendshipSchema);

export default Friendship;
