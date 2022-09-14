const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.HR_PASSWORD,
    database: "Semi1-Proyecto1",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 5,
    namedPlaceholders: true
});


module.exports.pool = pool

/*
* host: process.env.S1MYSQLHOST
* user: proces.env.S1USER
* password:
* */
