import * as dotenv from 'dotenv';
import pkg from 'passport-jwt';
import User from '../models/User.js';
const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;
dotenv.config();
let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findById(jwt_payload._id)
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
            // or you could create a new account
          }
        })
        .catch((err) => {
          if (err) {
            return done(err, false);
          }
        });
    })
  );
};

// export default passportConfig;
