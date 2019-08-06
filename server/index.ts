import next from 'next';
import express from 'express';
import bodyParser from 'body-parser';
import Database, { session } from './Database/database';
import passport from 'passport';
import bcrypt from 'bcrypt';
import userRoutes from './Entities/User/UserRoutes';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const next_ViewProvider = app.getRequestHandler();

app.prepare().then(() => {
  // express code here
  const server = express();
  server.use(bodyParser.json());
  server.use(session);
  server.set('views', __dirname + '/views');
  server.set('view-engine', 'twig');
  server.use(express.urlencoded({ extended: false }));
  server.use(passport.initialize());
  server.use(passport.session());
  
  server.get('/', (_req, res) => {
    res.render('index.twig');
  });
  
  /*================ Routes ================*/
  server.use(userRoutes(next_ViewProvider));
  
  server.get('*', (req, res) => {
    return next_ViewProvider(req, res); // for all the react stuff
  });
  
  server.listen(port, err => {
    if (err) throw err;
    console.log(`ready at http://localhost:${port}`);
  });
});
