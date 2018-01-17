import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { auth } from '../config';
import ErrorsService from './errors';

const noUserOrPasswordInvalidMessage = ErrorsService.generateErrorMessage(
  'Username or password is invalid'
);

const userExistsAndPasswordsMatch = ({ password }) => user => {
  return user && compareSync(password, user.password);
};

const generateJWT = ({ id }) => ({
  token: sign({ id }, auth.secret, { expiresIn: auth.tokenAge }),
});

export default {
  userExistsAndPasswordsMatch,
  noUserOrPasswordInvalidMessage,
  generateJWT,
};
