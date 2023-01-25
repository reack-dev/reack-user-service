require('dotenv').config();

const HOST = process.env.HOST;

const PORT = process.env.PORT;

const SECRET = process.env.SECRET;

const SQL_DB_NAME = process.env.SQL_DB_NAME;

const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  HOST,
  PORT,
  SECRET,
  SQL_DB_NAME,
  MONGODB_URI,
};
