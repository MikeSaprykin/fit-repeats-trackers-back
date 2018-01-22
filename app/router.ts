import { Router } from 'express';
import UsersController from './controllers/users';
import AuthController from './controllers/auth';
import ProfileController from './controllers/profile';
import { auth } from './middlewares/auth';

const router = Router();

router.get('/', (req, res) => {
  res.send('OPPA!');
});
router.use('/api/auth', AuthController.router);
router.use('/api/users', UsersController.router);
router.use('/api/profile', auth, ProfileController.router);

export default router;
