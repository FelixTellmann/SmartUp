import { Router } from 'express';


export default function makeRoutes(viewProvider, passport, userActions) {
  const {
    isNotAuth,
    isAuth,
    userRegister,
    userConfirmAccount,
    userLogin,
    userLogout,
    userDetail,
    userEdit,
    userForgotPassword
  } = userActions;
  
  const router = Router();
  /*================ Accessible when not logged in ================*/
  router.get('/user/register', isNotAuth, (req, res) => res.render('userRegister.twig'));
  router.post('/user/register', isNotAuth, userRegister);
  router.get('/user/register/:email_activation_token', isNotAuth, userConfirmAccount);
  router.get('/user/forgotPassword', isNotAuth, (req, res) => res.render('userForgotPassword.twig'));
  router.post('/user/forgotPassword', isNotAuth, userForgotPassword);
  router.get('/user/login', isNotAuth, (req, res) => res.render('userLogin.twig'));
  router.post('/user/login', isNotAuth, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }));
  
  /*================ Accessible when logged in ================*/
  router.get('/user/:id', isAuth, userDetail);
  router.get('/user/logout', isAuth, userLogout);
  router.get('/user/:id/edit', isAuth, (req, res) => res.render('userEdit.twig'));
  router.post('/user/:id/edit', isAuth, userEdit);
  
  // testing to add views via next - handle() to provide access to the next level io
  router.get('/test', (req, res) => viewProvider(req, res));
  return router;
}
