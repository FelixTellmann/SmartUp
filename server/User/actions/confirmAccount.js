export default function makeConfirmAccount({ User, db }) {
  return async function confirmAccount({ params: { email_activation_token } }, res) {
    try {
      const data = new User(await db.readUser({ email_activation_token }));
      await db.updateUser({ email: data.email }, new User({
        ...data,
        is_activated: true,
        email_activation_token: null,
      }));
      res.redirect('/user/login');
    } catch (err) {
      console.log(err);
      res.status(400).send(err.message);
    }
  };
}