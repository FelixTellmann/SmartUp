import express, { Router } from 'express';
import bcrypt from 'bcrypt';
import User from './User';
import db from './database';
import Mailer from './UserMailer';
import {
  isAuth,
  isNotAuth,
  logout,
  makeRegister,
  makeConfirmAccount,
  makeLogin,
  makeCreateResetToken,
  makeChangePasswordWithResetToken,
  initiateAuthentication,
  makeGetDetail,
} from './actions/';

export { isAuth, isNotAuth };

export default function ({ passport }) {
  initiateAuthentication({ passport, bcrypt, User, db });
  const register = makeRegister({ User, Mailer, db, bcrypt });
  const confirmAccount = makeConfirmAccount({ User, db });
  const login = makeLogin({ passport });
  const createResetToken = makeCreateResetToken({ User, Mailer, db, bcrypt });
  const changePasswordWithResetToken = makeChangePasswordWithResetToken({ User, db, bcrypt });
  const getDetail = makeGetDetail({ User, db });
  const router = Router();
  
  /*================ Accessible when not logged in ================*/
  router.get('/user/register', isNotAuth, (req, res) => res.render('userRegister.twig'));
  router.post('/user/register', isNotAuth, register);
  router.get('/user/register/:email_activation_token', isNotAuth, confirmAccount);
  router.get('/user/login', isNotAuth, (req, res) => res.render('userLogin.twig'));
  router.post('/user/login', isNotAuth, login);
  router.get('/user/forgotPassword', isNotAuth, (req, res) => res.render('userForgotPassword.twig'));
  router.post('/user/forgotPasword', isNotAuth, createResetToken);
  router.get('/user/resetPassword/:email/:reset_token', isNotAuth, ({ params: { email, reset_token } }, res) => {
    return res.render('userForgotPasswordCreateNew.twig', { email, reset_token });
  });
  
  router.post('/user/changePasswordWithResetToken', isNotAuth, changePasswordWithResetToken);
  
  /*================ Accessible when logged in ================*/
  router.get('/user/:id', /*isAuth,*/ getDetail);
  router.get('/user/logout', isAuth, logout);
  /*router.get('/user/:id/edit', isAuth, (req, res) => res.render('userEdit.twig'));
  router.post('/user/:id/edit', isAuth, userEdit);
  router.post('/user/:id/delete', isAuth, userEdit);
  
  // testing to add views via next - handle() to provide access to the next level io
  router.get('/test', (req, res) => viewProvider(req, res));*/
  return router;
}
