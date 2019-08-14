import dotenv from 'dotenv';
import expressSession from 'express-session';
import MySQLStore from 'express-mysql-session';
import mysql from 'mysql2/promise';

dotenv.config();

export const database = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const sessionStore = new MySQLStore({}, database);

export const session = expressSession({
  secret: 'asdasdqweasdaqwdsawas',
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
});

export default database;