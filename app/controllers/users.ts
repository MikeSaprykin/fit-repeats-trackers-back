import { Router } from 'express';
import UserModel from '../models/user';

const router = Router();

const getUsers = async (req, res) => {
  const users = await UserModel.find({}).exec();
  res.json(users.map((user: any) => user.getPublicUserData()));
};

const getUserWithId = async (req, res) => {
  const [user] = await UserModel.find({ _id: req.params.id })
    .exec()
    .catch(e => {
      res.send('No user with such email');
      return [];
    });
  res.json(user ? user.getUserProfile() : {});
};

const getUserDetails = async (req, res) => {
  res.json({});
};

const addUser = async (req, res) => {
  const user = await UserModel.insertMany({ ...req.body });
  res.json(user);
};

const deleteUser = async (req, res) => {
  await UserModel.deleteOne({ _id: req.params.id }).exec();
  res.json({ success: true });
};

router.get('/', getUsers);
router.get('/profile', getUserDetails);
router.get('/:id', getUserWithId);
router.post('/', addUser);
router.delete('/:id', deleteUser);

export default {
  router,
};
