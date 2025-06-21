const express = require('express');
const router = express.Router();
const conexion = require('../config/conexion');
const link = require('../config/link');

router.post('/regUsuario', function(req, res){
    const { name, user, pass, email, telefono, cedula, edificio, apartamento, cargo } = req.body;
    const fecha = new Date().toLocaleDateString('es-ES');

    const insertar = `
        INSERT INTO inf_usuarios (nombre_apellido, usuario, clave, email, telefono, cedula, edificio, apartamento, id_cargo, fecha)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const valores = [name, user, pass, email, telefono, cedula, edificio, apartamento, cargo, fecha];

    conexion.query(insertar,valores, function(err, row){
        if(err){
            console.error("Error al insertar el usuario", err);
            res.status(500).send("Error al registrar usuario");
        } else {
            console.log("Usuario insertado correctamente");
            const mensaje = "Usuario registrado correctamente ya puede iniciar sesión";
            res.render("login", { mensaje, linkLogin: link.linkLogin });
        }
    });
});

module.exports = router;
