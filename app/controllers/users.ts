import { Router } from 'express';
import { maybeResult, checkMaybeResult } from '../helpers';
import UserModel from '../models/user';
import { bindNodeCallback } from 'rxjs/observable/bindNodeCallback';

const router = Router();

const getUsers = async (req, res) => {
  const users = await UserModel.find({}).exec();
  res.json(users.map((user: any) => user.getPublicUserData()));
};

const getUserProfileById = async (req, res) => {
  /**
   * OBSERVABLE PATH
   */
  // bindNodeCallback(
  //     UserModel.findById.bind(UserModel)
  // )(req.params.id)
  //       .subscribe(
  //           (user: any) => res.json(user ? user.getUserProfile() : {}),
  //           () => res.send('No user with such email'),
  //           () => console.log('done')
  //       );
  //   /**
  //    * ASYNC AWAIT PATH WITHOUT HELPER
  //    */
  //
  //   const user: any = await UserModel.findById(req.params.id).exec()
  //       .catch(error => res.send('No user with such email'));
  //   res.json(user ? user.getUserProfile() : {});
  //
  //
  //   /**
  //    * ASYNC AWAIT MAYBE PATH WITH HELPER
  //    */
  checkMaybeResult(
    ({ result: user }) => res.json(user ? user.getUserProfile() : {}),
    () => res.send('No user with such email')
  )(await maybeResult(UserModel.findById(req.params.id).exec()));
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
router.get('/:id', getUserProfileById);
router.post('/', addUser);
router.delete('/:id', deleteUser);

export default {
  router,
};
