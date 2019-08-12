const LocalStrategy = require('passport-local').Strategy;

function initialize(passport, bcrypt, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: 'No user with that email' });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'passsword incorrect' });
      }
    } catch (err) {
      return done(err);
    }
  };
  passport.use('local', new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: 'No user with that email' });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'passsword incorrect' });
      }
    } catch (err) {
      return done(err);
    }
  }));
  passport.serializeUser((user, done) => done(null,user.id) );
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
}

module.exports = initialize;