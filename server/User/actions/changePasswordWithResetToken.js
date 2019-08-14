export default function makeChangePasswordWithResetToken({ User, db, bcrypt }) {
  return async function changePasswordWithResetToken({ body: { email, password, reset_token } }, res, next) {
    try {
      const user = new User(await db.readUser({ email }));
      if (user && user.reset_token === reset_token && user.is_activated && user.reset_token_valid_until > new Date()) {
        const userNewPassword = new User({
          ...user,
          reset_token: null,
          reset_token_valid_until: null,
          password: await bcrypt.hash(password, 10),
        });
        await db.updateUser({ email }, userNewPassword);
        res.redirect('/user/login');
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err.message);
    }
  };
}
