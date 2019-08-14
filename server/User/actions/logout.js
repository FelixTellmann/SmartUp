export async function logout(req, res, next) {
  req.logout();
  res.redirect('/user/login');
};
