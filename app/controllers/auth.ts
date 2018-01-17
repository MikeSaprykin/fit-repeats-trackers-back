import UserModel from '../models/user';
import { Router } from 'express';
import { ifElse } from 'ramda';
import { ErrorCodes } from '../helpers';
import AuthService from '../services/auth';

const router = Router();

const loginUser = async (req, res) => {
  ifElse(
    AuthService.userExistsAndPasswordsMatch(req.body),
    user => res.json(AuthService.generateJWT(user)),
    () => {
      res
        .status(ErrorCodes.BAD_REQUEST)
        .json(AuthService.noUserOrPasswordInvalidMessage);
    }
  )(await UserModel.findOne({ username: req.body.username }).exec());
};

router.post('/login', loginUser);

export default {
  router,
};
