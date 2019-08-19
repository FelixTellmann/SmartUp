export default function makeRegister({ User, Mailer, db, bcrypt }) {
  return async function register({ body: { email, password } }, res, next) {
    try {
      const user = new User({
        password: await bcrypt.hash(password, 10),
        email_activation_token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        is_activated: false,
        email,
      });
      await db.createUser(user);
      await Mailer.sendEmailConfirmation(user);
      res.redirect('/user/login');
    } catch (err) {
      res.status(400).send(err.message);
    }
  };
}
