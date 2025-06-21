const express = require('express');
const router = express.Router();
const conexion = require('../config/conexion');

router.delete('/deleProve/:id_proveedor', (req, res) => {
    const id_proveedor = req.params.id_proveedor;

    // Validar que id_proveedor sea un número entero
    if (!Number.isInteger(Number(id_proveedor)) || Number(id_proveedor) <= 0) {
        return res.status(400).json({ error: 'ID de proveedor inválido' });
    }

    const dele = 'DELETE FROM proveedores WHERE id_proveedor = ?';

    conexion.query(dele, [id_proveedor], (error, result) => {
        if (error) {
            console.error('Error al eliminar el proveedor', error);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }

        console.log('Proveedor eliminado exitosamente');
        res.status(200).json({ message: 'Proveedor eliminado' });
    });
});

module.exports = router;