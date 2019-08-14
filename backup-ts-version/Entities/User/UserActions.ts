import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import makeUser from './User';
import { readUser, createUser, updateUser, deleteUser } from './UserDatabaseActions';
import { sendEmailConfirmation } from './UserMailerActions';
import passport from 'passport';
import { Strategy } from 'passport-local';


interface makeUserActions {
  passport?,
  makeUser?: any,
  database?,
  mailer?
}

function makeUserActions({ passport, makeUser, database, mailer }: makeUserActions) {
  return Object.freeze({
    initialzeAuthentication,
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
    console.log('NOT authenticated?');
    req.isUnauthenticated() ? next() : res.redirect('/');
  }
  
  async function isAuth(req: Request, res: Response, next: NextFunction) {
    console.log('authenticated?');
    req.isAuthenticated() ? next() : res.redirect('/user/login');
  }
  
  async function userRegister({ body: { email, password } }: Request, res: Response, next: NextFunction) {
    try {
      const data = {
        password: await bcrypt.hash(password, 10),
        email_activation_token: encodeURI(await bcrypt.hash(email, 4)),
        is_activated: false,
        email
      };
      await createUser(makeUser(data).getUser());
      await sendEmailConfirmation(data, process.env.URL);
      res.redirect('/user/login');
    } catch (err) {
      res.status(400).send(err);
    }
  }
  
  async function userConfirmAccount({ params: { email_activation_token } }: Request, res: Response, next: NextFunction) {
    try {
      const data = makeUser(await readUser({ email_activation_token })).getUser();
      await updateUser({ email: data.email }, { ...data, is_activated: true, email_activation_token: null });
      res.redirect('/user/login');
    } catch (err) {
      res.status(400).send(err);
    }
  }
  
  function userLogin(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/user/login',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    });
  }
  
  function userLogout(req: Request, res: Response, next: NextFunction) {
    req.logout();
    res.redirect('/user/login');
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
  
  function initialzeAuthentication() {
    passport.use('local', new Strategy({
        usernameField: 'email',
        passwordField: 'password'
      }, async (email, password, done) => {
        try {
          console.log('asd');
          const user = makeUser(await readUser({ email })).getUser();
          console.log(user);
          if (await bcrypt.compare(password, user.password) && user.is_activated) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'passsword incorrect or email not confirmed' });
          }
        } catch (err) {
          return done(err);
        }
      })
    );
    
    passport.serializeUser((user, done) => done(null, user.email));
    passport.deserializeUser(async (email, done) => done(null, makeUser(await readUser({ email })).getUser()));
    return passport;
  }
}

export const {
  initialzeAuthentication,
  isNotAuth,
  isAuth,
  userRegister,
  userLogin,
  userLogout,
  userDetail,
  userEdit,
  userForgotPassword,
  userConfirmAccount
} = makeUserActions({ passport, makeUser });
