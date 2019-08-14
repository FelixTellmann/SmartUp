export default function makeCreateResetToken({ User, Mailer, db, bcrypt }) {
  return async function createResetToken({ body: { email } }, res, next) {
    try {
      const user = new User(await db.readUser({ email }));
      if (user && user.is_activated) {
        const userWithResetToken = new User({
          ...user,
          reset_token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          reset_token_valid_until: new Date(new Date().getTime() + 60 * 60 * 24 * 1000) /* Now + 24 Hours */,
        });
        
        await db.updateUser({ email }, userWithResetToken);
        await Mailer.sendResetToken(userWithResetToken);
        res.redirect('/user/login');
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err.message);
    }
  };
}
