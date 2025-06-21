const express = require('express');
const router = express.Router();
const conexion = require('../config/conexion');

router.get('/deleProve/:id_proveedor', (req, res) => {
    const id = req.params.id_proveedor;
    const adminPassword = req.query.password;
    const checkQuery = 'SELECT id_cargo FROM proveedores WHERE id_proveedor = ?';

    conexion.query(checkQuery, [id], (err, results) => {
        if(err) {
            console.error('Error al verificar proveedor:', err);
            return res.status(500).send('Error del servidor.');
        }
        if(results.length === 0) {
            return res.status(404).send('Proveedor no encontrado.');
        }
        
        const isAdmin = results[0].id_cargo === 1;

        if(isAdmin) {
            const claveAdmin = 'admin123';
            if(!adminPassword || adminPassword !== claveAdmin) {
                return res.status(403).send('Clave de administrador requerida');
            }
        }

        const eliminar = 'DELETE FROM proveedores WHERE id_proveedor = ?';
        conexion.query(eliminar, [id], (err, result) => {
            if(err) {
                console.error('Error al eliminar el proveedor:', err);
                return res.status(500).send('Error en el servidor.');
            }
            console.log('Proveedor eliminado exitosamente');
            res.redirect('/admin/proveedores');
        });
    });
});

module.exports = router;