const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const con = require("../db/db.js");

const { promisify } = require("util");

//Registro
exports.register = async (req, res) => {
  try {
    //Capturar los datos
    const name = req.body.name;
    const user = req.body.user;
    const pass = req.body.pass;

    //Hash de la password 8 saltos
    let passHash = await bcryptjs.hash(pass, 8);

    con.query(
      "INSERT INTO users SET ?",
      { user: user, name: name, password: passHash },
      (error, results) => {
        if (error) {
          res.render("register", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Nombre de usuario en uso",
            alertIcon: "error",
            showConfirmButton: false,
            showCancelButton: true,
            timer: false,
            ruta:"register"
          });
        } else {
          res.render("register", {
            alert: true,
            alertTitle: "Exito",
            alertMessage:
              "Cuentra creada exitosamente",
            alertIcon: "success",
            showConfirmButton: true,
            showCancelButton: false,
            timer: false,
            ruta: "inicio"
        
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//Login
exports.login = async (req, res) => {
  try {
    const user = req.body.user;
    const pass = req.body.pass;

    if (!user || !pass) {
      res.render("login", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un usuario y password",
        alertIcon: "info",
        showConfirmButton: true,
        timer: false,
        ruta: "login",
      });
    } else {
      con.query(
        "SELECT * FROM users WHERE user = ?",
        [user],
        async (error, results) => {
          if (
            results.length == 0 ||
            !(await bcryptjs.compare(pass, results[0].password))
          ) {
            res.render("login", {
              alert: true,
              alertTitle: "Error",
              alertMessage: "Usuario y/o Password incorrectas",
              alertIcon: "error",
              showConfirmButton: true,
              timer: false,
              ruta: "login",
            });
          } else {
            //inicio de sesión coorecto
            const id = results[0].id;
            const token = jwt.sign({ id: id }, "NewInntech", {
              expiresIn: "30d",
            });

            const cookiesOptions = {
              expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
              httpOnly: true,
            };
            res.cookie("jwt", token, cookiesOptions);
            res.render("login", {
              alert: true,
              alertTitle: "Exito",
              alertMessage: "Inicio de sesión exitoso",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 0,
              ruta: "inicio",
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

exports.isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        "NewInntech"
      );
      con.query(
        "SELECT * FROM users WHERE id = ?",
        [decodificada.id],
        (error, results) => {
          if (!results) {
            return next();
          }
          req.user = results[0];
          return next();
        }
      );
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    res.redirect("/login");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};
