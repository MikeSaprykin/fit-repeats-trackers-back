import { compareSync } from 'bcrypt';
import * as crypto from 'crypto';
import { ifElse, isNil, always } from 'ramda';
import { sign } from 'jsonwebtoken';
import { auth } from '../config';
import UserModel from '../models/user';
import ErrorsService from './errors';

const noUserOrPasswordInvalidMessage = ErrorsService.generateErrorMessage(
  'Username or password is invalid'
);

const refreshTokenInvalidMessage = ErrorsService.generateErrorMessage(
  'Refresh token is invalid'
);

const userExistsAndPasswordsMatch = ({ password }) => user =>
  user && compareSync(password, user.password);

const generateRefreshToken = () => crypto.randomBytes(50).toString('hex');

const generateJWT = id =>
  sign({ id }, auth.secret, { expiresIn: auth.tokenAge });

type UpdateRefreshTokenConditions = { _id: string } | { refreshToken: string };

const updateRefreshTokenAndReturnUser = async (
  cond: UpdateRefreshTokenConditions,
  refreshToken
) => await UserModel.findOneAndUpdate(cond, { refreshToken });

interface JWTAndRefreshTokens {
  token: string;
  refreshToken: string;
}

const generateTokens = (
  id: string,
  refreshToken = ''
): JWTAndRefreshTokens => ({
  token: generateJWT(id),
  refreshToken: refreshToken || generateRefreshToken(),
});

const generateTokensAndSaveRefreshToken = async ({
  id,
}): Promise<JWTAndRefreshTokens> => {
  const tokens = generateTokens(id);
  await updateRefreshTokenAndReturnUser({ _id: id }, tokens.refreshToken);
  return tokens;
};

const refreshTokenAndReturnNewTokens = async ({
  refreshToken,
}): Promise<JWTAndRefreshTokens> => {
  const newRefreshToken = generateRefreshToken();
  const user = await updateRefreshTokenAndReturnUser(
    { refreshToken },
    newRefreshToken
  );
  return ifElse(isNil, always(null), ({ _id }) =>
    generateTokens(_id, newRefreshToken)
  )(user);
};

export default {
  userExistsAndPasswordsMatch,
  noUserOrPasswordInvalidMessage,
  refreshTokenInvalidMessage,
  generateTokensAndSaveRefreshToken,
  refreshTokenAndReturnNewTokens,
};
