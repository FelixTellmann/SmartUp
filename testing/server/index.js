require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const server = express();
const passport = require('passport');
const initializePassport = require('./passport-config.js');
const flash = require('express-flash');
const session = require('express-session');
const nodemailer = require('nodemailer');

initializePassport(
  passport,
  bcrypt,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id),
);

server.set('views', __dirname + '/views');
server.set('view-engine', 'twig');
server.use(express.urlencoded({ extended: false }));
server.use(flash());
server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
server.use(passport.initialize());
server.use(passport.session());

const users = [];
const resetTokens = [];

server.get('/', checkAuthenticated, (req, res) => {
  res.render('index.twig', { name: req.user.name });
});

server.get('/logout', checkAuthenticated, (req, res) => {
  req.logOut();
  res.redirect('/login');
});

server.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.twig');
});

server.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

server.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.twig');
});

server.get('/changePass', (req, res) => {
  res.render('changePass.twig', { validResetToken: 'test' });
});

server.post('/changePass', async (req, res) => {
  const userIndex = users.findIndex(user => user.email === req.body.email);
  if (users[userIndex] == null) {
    res.send('no User found');
  }
  try {
    if (await bcrypt.compare(req.body.currentPassword, users[userIndex].password)) {
      users[userIndex] = { ...users[userIndex], password: await bcrypt.hash(req.body.newPassword, 10) };
      req.logOut();
      res.redirect('/login');
    } else {
      res.send('Password incorrect');
    }
  } catch (err) {
    return res.send(err);
  }
  console.log(users);
});

server.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    
    res.redirect('/login');
  } catch {
    res.status(400).redirect('/register');
  }
  console.log(users);
});

server.post('/reset-password', checkNotAuthenticated, async (req, res, next) => {
  try {
    console.log(req.body.resetEmail);
    let transporter = nodemailer.createTransport({
      host: 'smtp.tellmann.co.za',
      port: 587,
      secure: false,
      auth: {
        method: 'PLAIN',
        user: 'felix@tellmann.co.za',
        pass: 'Fr10tz1!1gh78ix',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    
    let info = await transporter.sendMail({
      from: '"Felix Tellmann" <felix@tellmann.co.za>', // sender address
      to: 'felix@burgerexchange.co.za', // list of receivers
      subject: 'Hello', // Subject line
      text: 'Hello world?', // plain text body
      html: `Hello, <br> Please Click on the link to verify your email.<br><a href="">Click here to verify</a>`, // html body
    });
    res.send(info);
  } catch (err) {
    throw new err;
  }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
}

function checkNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
}

server.listen(3001, () => console.log('Listening on port 3001'));