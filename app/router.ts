import { Router } from 'express';
import UserController from './controllers/user';
import { onAuth } from './controllers/auth';

const router = Router();

router.get('/', (req, res) => {
  res.send('OPPA!');
});
router.post('/api/auth', onAuth);
router.use('/api/users', UserController.router);

export default router;
