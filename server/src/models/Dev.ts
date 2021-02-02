import { Schema, model, Types, Document } from 'mongoose';

interface DevProps extends Document {
  name: string;
  user: string;
  bio?: string;
  avatar: string;
  likes: string[];
  dislikes: string[];
}

const DevShema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  bio: String,
  avatar: {
    type: String,
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Dev'
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'Dev'
  }]
}, {
  timestamps: true
});

export default model<DevProps>('Dev', DevShema);