import { passport } from '../config';
const jwt = 'jwt';

export const auth = passport.authenticate(jwt, {
  session: false,
  failWithError: true,
});
