import UserModel from '../models/user';
import { Router } from 'express';
import { ifElse, isNil } from 'ramda';
import { StatusCodes } from '../helpers';
import AuthService from '../services/auth';

const router = Router();

const loginUser = async (req, res) => {
  ifElse(
    AuthService.userExistsAndPasswordsMatch(req.body),
    async user =>
      res
        .status(StatusCodes.OK)
        .send(await AuthService.generateTokensAndSaveRefreshToken(user)),
    () =>
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(AuthService.noUserOrPasswordInvalidMessage)
  )(await UserModel.findOne({ username: req.body.username }).exec());
};

const refreshToken = async (req, res) => {
  ifElse(
    isNil,
    () =>
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(AuthService.refreshTokenInvalidMessage),
    token => res.json(token)
  )(await AuthService.refreshTokenAndReturnNewTokens(req.body));
};

router.post('/login', loginUser);
router.post('/refresh', refreshToken);

export default {
  router,
};
