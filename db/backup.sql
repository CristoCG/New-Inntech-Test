CREATE DATABASE IF NOT EXISTS newt;

USE newt;

CREATE TABLE IF NOT EXISTS costumers (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    tel VARCHAR(50) NOT NULL,
    job VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);


INSERT INTO costumers (name, address, tel, job) VALUES
('Cristobal', 'Calle Principal 123', '123456789', 'Desarrollador'),
('Juan Pérez', 'Calle Principal 123', '123456789', 'Programador'),
('María Gómez', 'Avenida Central 456', '987654321', 'Diseñadora');
