import Strategy from 'passport-local';

export default function initiateAuthentication({ passport, bcrypt, User, db }) {
  passport.use('local', new Strategy({
      usernameField: 'email',
      passwordField: 'password',
    }, async (email, password, done) => {
      try {
        const user = new User(await db.readUser({ email }));
        if (await bcrypt.compare(password, user.password) && user.is_activated) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err);
      }
    }),
  );
  
  passport.serializeUser((user, done) => done(null, user.email));
  passport.deserializeUser(async (email, done) => done(null, new User(await db.readUser({ email }))));
}