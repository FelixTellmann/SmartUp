export async function isAuth(req, res, next) {
  console.log('authenticated?');
  req.isAuthenticated() ? next() : res.redirect('/user/login');
}

export async function isNotAuth(req, res, next) {
  console.log('NOT authenticated?');
  req.isUnauthenticated() ? next() : res.redirect('/');
}