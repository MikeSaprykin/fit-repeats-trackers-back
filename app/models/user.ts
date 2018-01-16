import { mongoose } from '../config';
import * as bcrypt from 'bcrypt';

export const initialPassword = bcrypt.hashSync('123456', 10);

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: 'Username is required' },
  password: { type: String, default: initialPassword },
  initialPasswordChanged: { type: Boolean, default: false },
  firstName: { type: String },
  lastName: { type: String },
  avatarUrl: { type: String },
  // email: {
  //     type: String,
  //     lowercase: true,
  //     unique: true,
  //     required: 'Email address is required',
  //     validate: {
  //         validator: (value) => {
  //             let emailRegex = /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/;
  //             return emailRegex.test(value);
  //         },
  //         message: 'Invalid email address',
  //     },
  //     trim: true,
  // },
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
  };
};

// userSchema.pre('save', next => {
//     if ((this.isNew && this.password) || this.isModified('password')) {
//         this.password = bcrypt.hashSync(this.password, 10);
//     }
//     next();
// });

export default mongoose.model('User', userSchema);
