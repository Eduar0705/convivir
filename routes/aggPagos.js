const express = require('express');
const router = express.Router();
const conexion = require('../config/conexion');
const link = require('../config/link');

router.post('/aggPagos', (req, res) => {
    const { referencia, monto, tipoPago, fecha, nombre, cedula, banco, torre, apart } = req.body;

    const insertar = `
        INSERT INTO pagos(num_referencia, monto_pago, tipo_pago, fecha_pago, nombre_p, cedula, bancoEmisor, Torre, apartamento) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const valores = [referencia, monto, tipoPago, fecha, nombre, cedula, banco, torre, apart];

    conexion.query(insertar, valores, (err, resul) => {
        if (err) {
            console.log('Error al registrar pago', err);
            return res.status(500).send('Error al registrar el pago');
        }
        console.log('Pago agregado con éxito');
        res.redirect('/users/pagos_usu.html');
    });
});

module.exports = router;
