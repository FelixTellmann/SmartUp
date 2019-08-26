export default function makeGetDetail({ User, db }) {
  return async function getDetail({ params: { id } }, res, next) {
    try {
      const data = new User(await db.readUser({ id }));
      return res.send({ ...data });
    } catch (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
  };
}
