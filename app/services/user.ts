import UserModel from '../models/user';
import ErrorsService from './errors';

const getUserById = async (id: string) => {
  const user = await UserModel.findById(id);
  return user || ErrorsService.errorNotFound();
};

export default {
  getUserById,
};
