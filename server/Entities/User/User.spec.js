import User from './User.ts';

describe('', () => {
  it('should have a valid email address', () => {
    expect(User({ email: 'felix@tellmann.' })).toThrowError('felix@tellmann. is not a valid Email Address.');
  });
  it('should have a valid email address', () => {
    expect(User({ email: 'felix@tellmann.co.za' })).toMatchObject({ email: 'felix@tellmann.co.za' });
  });
});