import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config();

const config = {
  host: process.env.MAIN_DB_HOST,
  user: process.env.MAIN_DB_USER,
  password: process.env.MAIN_DB_PASSWORD,
  database: process.env.MAIN_DB_NAME,
  connectionLimit: parseInt(process.env.MAIN_DB_CONNECTION_LIMIT || "100"),
  waitForConnections: true,
  multipleStatements: true
};

const mainDBPool = mysql.createPool(config);


export default mainDBPool;
