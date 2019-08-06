

const loadDependencies = ({ ID }) => createUser = (
  {
    id = ID,
    email,
    password,
    created_at = Date.now(),
    modified_at = Date.now(),
    reset_token,
    reset_token_valid_until,
    user_role_id,
    employee_id,
  } = {},
) => {
  const user = {
    id: id,
    email: email,
  };
  return user;
};
module.exports = loadDependencies;
const createUser2 = require('./User')({ ID: 32 });

console.log(createUser2({ id: 12, email: 'test' }));