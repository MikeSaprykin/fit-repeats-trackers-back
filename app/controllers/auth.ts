import UserModel from '../models/user';
import { Router } from 'express';
import { ifElse, isNil } from 'ramda';
import { StatusCodes } from '../helpers';
import AuthService from '../services/auth';
import { fieldsInBodyRequired } from '../middlewares/auth';

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
  )(await UserModel.findOne({ email: req.body.email }).exec());
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

router.post('/login', fieldsInBodyRequired('password', 'email'), loginUser);
router.post('/refresh', fieldsInBodyRequired('refreshToken'), refreshToken);

export default {
  router,
};
