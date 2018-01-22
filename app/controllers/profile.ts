import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { multer } from '../config';

const router = Router();

router.get('/', auth, (req, res) => {
  res.send({ token: 'bla' });
});
router.post('/avatar', multer.single('avatar'), (req, res) => {
  res.send('WHAT!');
});

export default {
  router,
};
