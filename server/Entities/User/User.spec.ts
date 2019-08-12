import User from './User';

const testUser = {
  email: 'felix@tellmann.co.za',
  password: 'randomtexthere123/.]=-z'
}


describe('User', () => {
  
  it('should have a valid email address', () => {
    const user = { ...testUser, email: 'felix@tellmann.' };
    expect(() => User(user)).toThrowError('felix@tellmann. is not a valid Email Address.');
  });
  
  it('should have a password', () => {
    expect(typeof User(testUser).getPassword()).toBe('string');
    expect(User(testUser).getPassword().length).toBeGreaterThan(0);
  });
  
  it('is createAt now in UTC', () => {
    const userDate = User(testUser).getCreatedAt();
    expect(userDate).toBeDefined();
    expect(new Date(userDate).toUTCString().substring(26)).toBe('GMT');
  });
  
  it('is modifiedAt now in UTC', () => {
    const userDate = User(testUser).getModifiedAt();
    expect(userDate).toBeDefined();
    expect(new Date(userDate).toUTCString().substring(26)).toBe('GMT');
  });
  
  it('can be Activated', function () {
    const userNotActivated = User(testUser).getIsActivated();
    const userIsActivated = User({ ...testUser, is_activated: true }).getIsActivated();
    expect(userNotActivated).toBe(false);
    expect(userIsActivated).toBe(true);
  });
});