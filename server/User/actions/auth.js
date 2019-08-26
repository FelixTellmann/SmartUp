export async function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.redirect('/user/login');
}

export async function isNotAuth(req, res, next) {
  req.isUnauthenticated() ? next() : res.redirect('/');
}