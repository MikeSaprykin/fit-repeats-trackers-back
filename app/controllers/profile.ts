import { Router } from 'express';
import { multer } from '../config';
import ProfileService from '../services/profile';
import { fieldsRequired } from '../middlewares/auth';
import { checkMaybeResult, maybeResult } from '../helpers/maybe-result';
import { StatusCodes } from '../helpers/status-codes';

const avatar = 'avatar';

const router = Router();

const uploadAvatar = async (req, res) => {
  const avatar = await ProfileService.uploadAvatar(req);
  res.json({ avatar });
};

const updateUserProfile = async (req, res) =>
  checkMaybeResult(
    ({ result: user }) => res.send(user ? user.getUserProfile() : {}),
    () =>
      res
        .status(StatusCodes.BAD_REQUEST)
        .send('There is an error with your request!')
  )(await maybeResult(ProfileService.updateProfile(req)));

router.get('/', (req, res) => res.send(req.user.getUserProfile()));
router.put('/', updateUserProfile);
router.post(
  `/${avatar}`,
  fieldsRequired(avatar),
  multer.single(avatar),
  uploadAvatar
);

export default {
  router,
};
