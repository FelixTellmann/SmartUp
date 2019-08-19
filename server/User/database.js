import db from '../database';

class Database {
  constructor(db) {
    this.db = db;
  }
  
  async readUser({ email = '', id = '', email_activation_token = '', reset_token = '' }) {
    const user = (await this.db.query('SELECT * FROM users WHERE email=? OR user_id=? OR email_activation_token=? OR reset_token=?', [email, id, email_activation_token, reset_token]))[0][0];
    if (user) {
      return user;
    } else {
      throw new Error('User not found');
    }
  }
  
  async createUser(user) {
    return await this.db.query(`INSERT INTO users SET ?`, user);
  }
  
  async updateUser({ email = '', id = '' }, data) {
    const user = { ...data, modified_at: new Date() };
    return await this.db.query('UPDATE users SET ? WHERE email=? OR user_id=?', [user, email, id]);
  }
  
  async deleteUser({ email, id }) {
    return await this.db.query('DELETE FROM users WHERE email=? OR user_id=?', [email, id]);
  }
}

export default new Database(db);
