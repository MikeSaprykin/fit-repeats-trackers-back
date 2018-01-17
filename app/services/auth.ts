import { compareSync } from 'bcrypt';
import * as crypto from 'crypto';
import { sign } from 'jsonwebtoken';
import { auth } from '../config';
import UserModel from '../models/user';
import ErrorsService from './errors';

const noUserOrPasswordInvalidMessage = ErrorsService.generateErrorMessage(
  'Username or password is invalid'
);

const userExistsAndPasswordsMatch = ({ password }) => user => {
  return user && compareSync(password, user.password);
};

const generateRefreshToken = id =>
  id.toString() + crypto.randomBytes(40).toString('hex');

const generateRefreshTokenAndSaveToModel = id => {
  const refreshToken = generateRefreshToken(id);
  UserModel.findOneAndUpdate({ id }, { refreshToken });
  return refreshToken;
};

const generateJWTResponse = ({ id }) => ({
  token: sign({ id }, auth.secret, { expiresIn: auth.tokenAge }),
  refreshToken: generateRefreshTokenAndSaveToModel(id),
});

export default {
  userExistsAndPasswordsMatch,
  noUserOrPasswordInvalidMessage,
  generateJWTResponse,
};
