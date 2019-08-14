export default function makeLogin({ passport }) {
  return async function login(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/user/login',
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    })(req, res, next);
  };
}
