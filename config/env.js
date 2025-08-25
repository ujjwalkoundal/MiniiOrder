// config/env.js
import dotenv from "dotenv";
dotenv.config({ quiet: true });  // suppresses logs

export default {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_HOST: process.env.DB_HOST || "localhost",
  PORT: process.env.PORT || 5000,
};
