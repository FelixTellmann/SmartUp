import db from '../../Database/database';

function makeDatabaseActions() {
  return Object.freeze({
    readUser,
    createUser,
    updateUser,
    deleteUser
  });
  
  async function readUser({ email, id }: { email?: string, id?: number }) {
    return (await db.query('SELECT * FROM users WHERE email=? OR user_id=?', [email, id]))[0];
  }
  
  async function createUser(user) {
    return await db.query(`INSERT INTO users SET ?`, user);
  }
  
  async function updateUser({ email, id }: { email?: string, id?: number }, user) {
    return await db.query('UPDATE users SET ? WHERE email=? OR user_id=?', [user, email, id]);
  }
  
  async function deleteUser({ email, id }: { email?: string, id?: number }) {
    return await db.query('DELETE FROM users WHERE email=? OR user_id=?', [email, id]);
  }
}

export const {
  readUser,
  createUser,
  updateUser,
  deleteUser
} = makeDatabaseActions();