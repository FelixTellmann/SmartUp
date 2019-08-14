/*============================================================================
  #User accounts to allow access to the platform based on identifcation of the person and to limit access - allow possible sales & tracking etc.
    - email
    - password
        - reset_token
        - reset_token_valid_until
    - created_at
    - modified_at
   
    - link to user_role_id
        - used for access levels of the application (admin, user, developer, etc.)

    - link to employee_id
        - link to position - via employee
        - link to department - via position
        - link to company - via department
    
    Security Options?
      - security questions???
      - security answers???
      
   #Use Cases
     - Register/Create new User
     - Validate Email/user access via email
     - Login - authenticate
     - Logout
     - Auto Logout (session time)
     - Delete
     - Reset Password
     - Change email
     - Change Password

   #API requests
     - POST /user/Register
     - GET  /user/Register/:email_confirm_token
     - POST /user/login
     - GET  /user/:id
     - GET  /user/logout
     - POST /user/delete
     - POST /user/forgot
     - GET  /user/forgot/:reset_token
     - GET  /user/:id
     - PUT  /user/:id/email
     - PUT  /user/:id/password
     
     - Find users - admin panel?
     - change/assign company
     - change/assign user_role
     - create forgot password reset_token
     - use forgot passsword reset_token
     -
==============================================================================*/


interface UserTypes {
  id: number,
  email?: string,
  password?: string,
  created_at?: number;
  modified_at?: number;
  reset_token?: string,
  reset_token_valid_until?: number;
  user_role_id?: number,
  employee_id?: number,
}

// @ts-ignore
const loadDependencies = ({ validator }) => {
  return function makeUser(
    {
      id,
      email,
      password,
      created_at = Date.now(),
      modified_at = Date.now(),
      reset_token,
      reset_token_valid_until,
      user_role_id,
      employee_id
    }: UserTypes) {
    
    if (!id) {
      throw new Error('User must have a valid id.');
    }
    if (validator.isEmail(email)) {
      throw new Error('User must have a valid email.');
    }
    if (!password) {
      throw new Error('User must have a password.');
    }
    
    return Object.freeze({
      getId: () => id,
      getEmail: () => email,
      getCreatedAt: () => created_at,
      getModifiedAt: () => modified_at,
      getResetToken: () => reset_token,
      getResetTokenValidUntil: () => reset_token_valid_until,
      getUserRoleId: () => user_role_id,
      getEmployeeId: () => employee_id
    });
  };
};


export default loadDependencies;