const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const crudController = require("../controllers/crudController");
const con = require("../db/db");

//Mostrar contenido de la pagina principal
//router para las vistas
router.get('/inicio', authController.isAuthenticated, (req, res)=>{
  res.render('index', {user:req.user, alert:false})
})
//Mostrar contenido de la pagina login
router.get("/login", (req, res) => {
  res.render("login", { alert: false,});
});
//Mostrar contenido de la pagina register
router.get("/register", (req, res) => {
  res.render("register", { alert: false });
});

//Api de la base de datos
//Consulta (R)
router.get("/api/db/users", (req, res) => {
  con.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM users", (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});
//Consulta (R)
router.get("/api/db/costumers", (req, res) => {
  con.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM costumers", (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});
//Borrar (D)
router.delete("/db/:id", (req, res) => {
  con.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "DELETE FROM costumers where id = ?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);

        res.send("Borrado");
      }
    );
  });
});
//Actualizar (U)
router.post("/db/:id", (req, res) => {
  con.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "UPDATE costumers SET ? WHERE id = ?",
      [req.body, req.params.id],
      (err, rows) => {
        if (err) return res.send(err);

        res.send("Actualizado");
      }
    );
  });
});

//Metodos del controlador

//Registro
router.post("/register", authController.register);

//Login
router.post("/login", authController.login);

//Logout
router.get("/logout", authController.logout);

//Añadir usuarios
router.post("/add", crudController.add);

module.exports = router;
