const express = require('express');
const router = express.Router();
const conexion = require('../config/conexion');

router.post('/aggEstadisticas', (req, res) => {
    const { user, pago, mes, fecha_inicio, fecha_final, confirmar } = req.body;
    
    if (!user || !pago || !mes) {
        console.error('Datos faltantes:', { user, pago, mes });
        return res.status(400).send('Faltan datos requeridos');
    }

    const confirmado = confirmar ? 1 : 0;

    let fechaInicioValida = fecha_inicio || null;
    let fechaFinalValida = fecha_final || null;

    console.log('Datos recibidos:', {
        user, pago, mes, fecha_inicio, fecha_final, confirmado
    });


    const insertar = `INSERT INTO pagosMesualidad(
        nombre_cedula, nombre_monto, mes, fecha_inicio, fecha_fin, confirmado) 
        VALUES (?, ?, ?, ?, ?, ?)`;

    const valores = [user, pago, mes, fechaInicioValida, fechaFinalValida, confirmado];

    conexion.query(insertar, valores, (err, result) => {
        if (err) {
            console.log('Error en la consulta SQL:', err);
            return res.status(500).json({
                error: 'Error al confirmar el pago en el registro',
                detalles: err.message
            });
        }
        console.log('Registro exitoso de control de pago');
        timeout(() => {
            res.redirect('/admin/estadisticas');
        }, 3000);
    });
});

module.exports = router;