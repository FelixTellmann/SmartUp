import { Router } from 'express';
import {
  isNotAuth,
  isAuth,
  userRegister,
  userConfirmAccount,
  userLogin,
  userLogout,
  userDetail,
  userEdit,
  userForgotPassword
} from './UserControllers';


export default function makeRoutes(viewProvider) {
  const router = Router();
  /*================ Accessible when not logged in ================*/
  router.get('/user/register', isNotAuth, (req, res) => res.render('userRegister'));
  router.post('/user/register', isNotAuth, userRegister);
  router.get('/user/register/:email_confirmation_token', isNotAuth, userConfirmAccount);
  router.get('/user/forgotPassword', isNotAuth, (req, res) => res.render('userForgotPassword'));
  router.post('/user/forgotPassword', isNotAuth, userForgotPassword);
  router.get('/user/login', isNotAuth, (req, res) => res.render('userLogin'));
  router.post('/user/login', isNotAuth, userLogin);
  
  /*================ Accessible when logged in ================*/
  router.get('/user/:id', isAuth, userDetail);
  router.get('/user/logout', isAuth, userLogout);
  router.get('/user/:id/edit', isAuth, (req, res) => res.render('userEdit'));
  router.post('/user/:id/edit', isAuth, userEdit);
  
  // testing to add views via next - handle() to provide access to the next level io
  router.get('/test', (req, res) => viewProvider(req, res));
  return router;
}
