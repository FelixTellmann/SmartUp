import next from 'next';
import User from './User';
import Api from './Api';
import passport from 'passport';
import express from 'express';
import bodyParser from 'body-parser';
import { session } from './database';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());
  server.set('views', __dirname + '/views');
  server.set('view-engine', 'twig');
  server.use(express.urlencoded({ extended: false }));
  server.use(session);
  server.use(passport.initialize());
  server.use(passport.session());
  
  /*================ API Routes ================*/
  server.use(User({ passport }));
  server.use(Api());
  
  /*server.get('/', (_req, res) => {
    res.render('index.twig');
  });*/
  
  /*================ Next js ================*/
  // Redirect any unauthorized pages routes to root
  server.get(['/components', '/components/*', '/helpers', '/helpers/*'], (req, res) => {
    res.redirect('/');
  });
  
  server.get('*', (req, res) => {
    return handle(req, res); // for all the react stuff
  });
  
  server.listen(port, err => {
    if (err) throw err;
    console.log(`ready at http://localhost:${port}`);
  });
});