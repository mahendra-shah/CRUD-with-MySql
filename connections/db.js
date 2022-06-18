const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "CRUD",
    password: "mysql-password",
  });


module.exports = connection