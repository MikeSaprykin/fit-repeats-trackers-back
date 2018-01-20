import { mongoose } from '../config';

const groupSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: 'Group name is required' },
  avatar: { type: String },
});
