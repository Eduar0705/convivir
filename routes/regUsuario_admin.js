const express = require('express');
const router = express.Router();
const conexion = require('../config/conexion');
const link = require('../config/link');

router.post('/regUsuario_admin', function(req, res) {
    const { name, user, pass, email, telefono, cedula, edificio, apartamento, cargo } = req.body;
    const fecha = new Date().toLocaleDateString('es-ES');

    const insertar = `
        INSERT INTO inf_usuarios (nombre_apellido, usuario, clave, email, telefono, cedula, edificio, apartamento, id_cargo, fecha)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const valores = [name, user, pass, email, telefono, cedula, edificio, apartamento, cargo, fecha];

    conexion.query(insertar, valores, function(err, row) {
        if (err) {
            console.log("Error al registrar usuario", err);
            return res.status(500).send("Error al registrar usuario");
        }
        console.log("Usuario registrado con éxito");
        res.redirect('/admin/user_admin');
    });
});

module.exports = router;