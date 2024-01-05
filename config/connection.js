const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createConnection(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    host: 'localhost',
    port: 3306,
    database: 'user_db'
});

module.exports = connection;