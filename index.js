const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();

//Motor para plantillas
app.set("view engine", "ejs");

//Poner la carpeta public para archivos estaticos
app.use(express.static("public"));

//Procesar los datos desde el formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Variables de entorno
dotenv.config = { path: "./.env" };

//Uso de las cookies
app.use(cookieParser());

//Llamar al enrutador
app.use("/", require("./routes/router"));


app.listen(3001, () => {
  console.log("Servidor iniciado en el puerto ", 3001);
});
