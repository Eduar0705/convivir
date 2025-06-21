const express = require('express'); 
const router = express.Router(); 
const conexion = require('../config/conexion'); 

router.post('/aggProve', (req, res) => { 
    const { 
        nombre_apellido, cedula, email, rif, 
        telefono, monto_pago, area_trabajo, 
        banco, cuenta_cedula, cuenta_telefono 
    } = req.body; 

    // Crear el objeto JSON para datos_cuenta
    const datosCuenta = {
        banco: banco,
        cedula: cuenta_cedula,
        telefono: cuenta_telefono
    };

    const insert = ` 
        INSERT INTO proveedores(nombre_apellido, cedula, email, datos_cuenta, rif, telefono, monto_pago, area_trabajo)  
        VALUES (?, ?, ?, ?, ?, ?, ?, ?) 
    `; 

    // Convertir el objeto a JSON string para MySQL
    const valores = [nombre_apellido, cedula, email, JSON.stringify(datosCuenta), rif, telefono, monto_pago, area_trabajo]; 

    conexion.query(insert, valores, (err, resul) => { 
        if (err) { 
            console.log('Error al registrar proveedor', err); 
            return res.status(500).send('Error al registrar proveedor'); 
        } 
        console.log('Proveedor agregado con éxito'); 
        res.redirect('/admin/proveedores'); 
    }); 
}); 

module.exports = router;