const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "CRUD",
    password: "Mahendra@1",
  });


module.exports = connection