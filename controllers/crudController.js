const express = require("express");
const con = require("../db/db.js");

exports.add = async (req, res) => {
  try {
    const name = await req.body.name;
    const address = await req.body.address;
    const tel = await req.body.tel;
    const job = await req.body.job;

    con.query(
      "INSERT INTO costumers SET ?",
      { name: name, address: address, tel: tel, job: job },
      (error, results) => {
        if (error) {
          res.render("", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "No se pudo agregar",
            alertIcon: "error",
            showConfirmButton: false,
            showCancelButton: true,
            timer: false,
          });
        } else {
          res.render("", {
            alert: true,
            alertTitle: "Exito",
            alertMessage: "Se agregó exitosamente en la base de datos",
            alertIcon: "success",
            showConfirmButton: true,
            showCancelButton: false,
            timer: false,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

async function userData() {
  const response = await fetch("https://localhost:3001/api/db");
  const data = await response.json();
  return data;
};
