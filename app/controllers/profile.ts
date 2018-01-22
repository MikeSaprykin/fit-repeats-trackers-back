import { Router } from 'express';
import { multer } from '../config';
import ProfileService from '../services/profile';

const router = Router();

router.get('/', (req, res) => {
  res.send({ token: 'bla' });
});
router.post('/avatar', multer.single('avatar'), async (req, res) => {
  const avatar = await ProfileService.uploadAvatar(req);
  res.json({ avatar });
});

export default {
  router,
};
