import validator from '../validation';

export default class User {
  constructor(data = {}, update = false) {
    const defaults = {
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
  
    if (update) {
      delete defaults.created_at;
    }
    
    Object.assign(this, { ...defaults, ...data, modified_at: new Date() });
  }
  
  static apiURI() { return 'user';}
  
  static apiDatabaseTable() { return 'users';}
  
  static apiDatabaseId() { return 'user_id';}
  
}