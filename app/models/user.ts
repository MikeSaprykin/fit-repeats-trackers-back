import { mongoose } from '../config';
import * as bcrypt from 'bcrypt';

export const initialPassword = bcrypt.hashSync('123456', 10);

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, default: null },
  password: { type: String, default: initialPassword, required: true },
  initialPasswordChanged: { type: Boolean, default: false },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  avatarUrl: { type: String, default: null },
  refreshToken: { type: String },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    validate: {
      validator: val => /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/.test(val),
      message: 'Invalid email address',
    },
    trim: true,
  },
});

userSchema.methods.getPublicUserData = function() {
  return {
    id: this._id,
    username: this.username,
  };
};
userSchema.methods.getUserProfile = function() {
  return {
    id: this._id,
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName,
    avatarUrl: this.avatarUrl,
    email: this.email,
  };
};

// userSchema.pre('save', next => {
//     if ((this.isNew && this.password) || this.isModified('password')) {
//         this.password = bcrypt.hashSync(this.password, 10);
//     }
//     next();
// });

export default mongoose.model('User', userSchema);
