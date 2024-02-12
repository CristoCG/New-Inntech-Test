const mysql = require("mysql");

const con = mysql.createPool({
  host: process.env.DB_HOST,
  user: "root",
  password: "",
  database: "newt",
});


con.getConnection((error, connection) => {
  if (error) {
    console.log("Error: " + error);
    return;
  }
  console.log("Conectado a la bd");

  });

module.exports = con;
