import UserModel from '../models/user';
import { compareSync } from 'bcrypt';
import { ifElse } from 'ramda';

export const onAuth = async (req, res) => {
  const { body: { username, password } } = req;
  ifElse(
    user => user && compareSync(password, user.password),
    () => res.json({ token: '123test123' }),
    () => res.send('EMAIL OR PASSWORD IS INVALID')
  )(await UserModel.findOne({ username }).exec());
};
