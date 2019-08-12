import validator from 'validator';

/*declare function makeUser(input: {
  email: string,
  password: string,
  employee_id?: number,
  company_id?: number,
  user_role_id?: number,
  create_at?: number,
  modified_at?: number,
  is_activated?: boolean
  email_activation_token?: string,
  reset_token?: string,
  reset_token_valid_until?: Date
}): void;*/

function loadDependencies(validator) {
  return function makeUser(
    {
      email,
      password,
      employee_id = 0,
      company_id = 0,
      user_role_id = 0,
      create_at = Date.now(),
      modified_at = Date.now(),
      is_activated = false,
      email_activation_token,
      reset_token,
      reset_token_valid_until
    }) {
    if (!validator.isEmail(email)) {
      throw new Error(`${email} is not a valid Email Address.`);
    }
    return Object.freeze({
      getEmail: () => email,
      getPassword: () => password,
      getEmployeeId: () => employee_id,
      getCompanyId: () => company_id,
      getUserRoleId: () => user_role_id,
      getCreatedAt: () => create_at,
      getModifiedAt: () => modified_at,
      getIsActivated: () => is_activated,
      getEmailActivationToken: () => email_activation_token,
      GetResetToken: () => reset_token,
      GetIsValidResetToken: () => reset_token_valid_until
    });
  };
}

const User = loadDependencies(validator);

export default User;
