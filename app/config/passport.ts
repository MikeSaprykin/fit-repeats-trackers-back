import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { auth } from './auth';
import UserService from '../services/user';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: auth.secret,
};

passport.use(
  new Strategy(opts, (jwtPayload, done) => {
    UserService.getUserById(jwtPayload.id)
      .then(user => done(null, user || false))
      .catch(err => done(err, false));
  })
);

export { passport };
