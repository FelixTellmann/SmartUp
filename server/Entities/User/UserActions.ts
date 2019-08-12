import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import makeUser from './User';
import nodemailer from 'nodemailer';
import { readUser, createUser, updateUser, deleteUser } from './UserDatabaseActions';


import * as passport from 'passport';

interface userMethodDependencies {
  passport?,
  makeUser?: any,
  database?,
  mailer?
}


function makeUserControllers({ passport, makeUser, database, mailer }: userMethodDependencies) {
  return Object.freeze({
    isNotAuth,
    isAuth,
    userRegister,
    userConfirmAccount,
    userLogin,
    userLogout,
    userForgotPassword,
    userDetail,
    userEdit
  });
  
  async function isNotAuth(req: Request, res: Response, next: NextFunction) {
    console.log('NOT authenticated');
    console.log(await readUser({ email: 'asd@ateaacst.com' }));
    req.isUnauthenticated() ? next() : res.redirect('/');
  }
  
  async function isAuth(req: Request, res: Response, next: NextFunction) {
    console.log('authenticated');
    req.isAuthenticated() ? next() : res.redirect('/login');
  }
  
  async function userRegister({ body: { email, password } }: Request, res: Response, next: NextFunction) {
    /*============================================================================
      #Data - Input
        - User = email, passsword, user_access_level?, company_id? employee_id?
        - User model with minimum information
      #Data - Output
        - User model with all information (some taken as default if not given)
          - activation_status: false
          - email_token & valid_until - 2 days?
          - Generated Link to activate email address
          
      1. System validates data
      2. System saves data
      3. System send out request for email confirmation
    ==============================================================================*/
    try {
      // @ts-ignore
      const User = makeUser({ email, password });
      /*
      database.checkDuplicates(user);
      database.storeUser(user);
      mailer.sendEmailConfirmation(user);*/
    } catch (err) {
      res.status(400).send(err);
    }
  }
  
  async function userConfirmAccount(req: Request, res: Response, next: NextFunction) {
    try {
      database.validateUser(req.params.email_confirmation_token);
      res.redirect('/login');
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
  
  function userLogin() {
    return true;
  }
  
  function userLogout(req: Request, res: Response, next: NextFunction) {
    req.logout();
    res.redirect('/');
  }
  
  function userForgotPassword() {
    return true;
  }
  
  function userDetail() {
    return true;
  }
  
  function userEdit() {
    return true;
  }
}

export const {
  isNotAuth,
  isAuth,
  userRegister,
  userLogin,
  userLogout,
  userDetail,
  userEdit,
  userForgotPassword,
  userConfirmAccount
} = makeUserControllers({ passport, makeUser });
