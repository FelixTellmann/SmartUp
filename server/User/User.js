import validator from 'validator';

export default class User {
  constructor(data) {
    const defaultValues = {
      email: '',
      password: '',
      employee_id: null,
      company_id: null,
      user_role_id: null,
      created_at: new Date(),
      modified_at: new Date(),
      is_activated: 0,
      email_activation_token: null,
      reset_token: null,
      reset_token_valid_until: null,
    };
    
    if (!validator.isEmail(data.email)) {
      throw new Error(`${data.email} is not a valid Email Address.`);
    }
    
    Object.assign(this, { ...defaultValues, ...data, modified_at: new Date() });
  }
}