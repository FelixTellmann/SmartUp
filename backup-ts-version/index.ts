import next from 'next';
import express from 'express';
import bodyParser from 'body-parser';
import Database, { session } from './Database/database';
import bcrypt from 'bcrypt';
import userRoutes from './Entities/User/UserRoutes';
import { initialzeAuthentication } from './Entities/User/UserActions';


const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const next_ViewProvider = app.getRequestHandler();


app.prepare().then(() => {
  // express code here
  const server = express();
  const passport = initialzeAuthentication();
  server.use(bodyParser.json());
  server.set('views', __dirname + '/views');
  server.set('view-engine', 'twig');
  server.use(express.urlencoded({ extended: false }));
  server.use(session);
  server.use(passport.initialize());
  server.use(passport.session());
  
  server.get('/user/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  
  server.get('/', (_req, res) => {
    res.render('index.twig');
  });
  
  /*================ Routes ================*/
  server.use(userRoutes(next_ViewProvider, passport));
  
  server.get('*', (req, res) => {
    return next_ViewProvider(req, res); // for all the react stuff
  });
  
  server.listen(port, err => {
    if (err) throw err;
    console.log(`ready at http://localhost:${port}`);
  });
});
