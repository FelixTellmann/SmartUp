function validateUser(user) {
  const { id, email, password } = user;
  return { id, email, password };
}

test('is user a valid user', () => {
  const userData = validateUser({ id: 12, email: 'felix@tellmann.co.za', password: 'asdasd' });
  expect(userData).toStrictEqual({ id: 12, email: 'felix@tellmann.co.za', password: 'asdasd' })
});