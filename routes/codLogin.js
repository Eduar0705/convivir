const express = require('express');
const router = express.Router();
const link = require('../config/link');
const conexion = require('../config/conexion');

router.post('/codLogin', function(req, res){
    const {user, pass} = req.body;

    const validar = `SELECT * FROM inf_usuarios WHERE usuario = ? AND clave = ?`;
    conexion.query(validar,[ user, pass ], async function(error, rows){
        let mensaje;
        if (error) {
            console.log("Error en la consulta de usuario", error);
            return res.status(500).send("Error en el servidor");
        }

        if (rows.length <= 0) {
            mensaje = "Usuario o contraseña incorrectos";
            return res.render('login', { mensaje, link });
        }

        const users = rows[0];

        if (!pass || !users.clave) {
            mensaje = "Contraseña incorrecta";
            return res.render('login', { mensaje, link });
        }

        // Almacenar datos en sesión 
        req.session.login = true;
        req.session.id = users.id;
        req.session.nombre_A = users.nombre_apellido;
        req.session.usuario = users.usuario;
        req.session.email = users.email;
        req.session.telefono = users.telefono;
        req.session.cedula = users.cedula;
        req.session.edificio = users.edificio;
        req.session.apartamento = users.apartamento;
        req.session.id_cargo = users.id_cargo;
        req.session.fecha = users.fecha;

        console.log(req.session);
        //contador de usuarios registrados
        const contador = `SELECT COUNT(*) AS total FROM inf_usuarios`;
        conexion.query(contador, function(err, result) {
            if (err) {
                console.error("Error al contar usuarios", err);
                return res.status(500).send("Error al contar usuarios");
            }
            req.session.totalUsuarios = result[0].total;
            console.log("Total de usuarios registrados:", req.session.totalUsuarios);
        });

        if (users.id_cargo === 1) {
            return res.redirect('/admin');
        } 
        else if (users.id_cargo === 2) {
            return res.redirect('/users');
        }
        else {
            mensaje = "Rol de usuario no válido";
            return res.render('login', { mensaje, link });
        }
    });
});

module.exports = router;