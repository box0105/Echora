import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // 允許連線, 數量五個
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

export default connection;