const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const con = require("../db/db");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

//Mostrar contenido de la pagina principal
router.get("/inicio", authController.isAuthenticated, async (req, res) => {
  try {
    // Hacer la petición a la API
    const response = await fetch("http://localhost:3001/api/db/costumers");
    const data = await response.json();

    // Renderizar la página con los datos obtenidos
    res.render("index", { data, alert: false, user: req.user });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});
//Mostrar contenido de la pagina login
router.get("/login", (req, res) => {
  res.render("login", { alert: false });
});
//Mostrar contenido de la pagina register
router.get("/register", (req, res) => {
  res.render("register", { alert: false });
});

//Api de la base de datos
//Usuarios
router.get("/api/db/users", (req, res) => {
  con.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM users", (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

//Costumers
router.get("/api/db/costumers", (req, res) => {
  con.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM costumers", (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

//Crud de la bd
//Crear (C)
router.post("/createdb", (req, res) => {
  con.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("INSERT INTO costumers SET ?", [req.body], (err, rows) => {
      if (err) return res.send(err);

      res.redirect("/inicio");
    });
  });
});

//Actualizar (U)

router.post("/updatedb/:id", (req, res) => {
  con.getConnection((err, conn) => {
    if (err) return res.send(err);

    const { id } = req.params;

    conn.query(
      "UPDATE costumers SET ? WHERE id = ?",
      [req.body, req.params.id],
      (err, rows) => {
        if (err) return res.send(err);

        res.redirect(303, "/inicio");
      }
    );
  });
});

//Borrar (D)
router.post("/deletedb/:id", (req, res) => {
  con.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "DELETE FROM costumers where id = ?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);
        res.redirect(303, "/inicio");
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

module.exports = router;
