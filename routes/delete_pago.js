const express = require('express');
const router = express.Router();
const conexion = require('../config/conexion');

router.get('/eliminarPago/:id_pago', (req, res)=>{
    const id_pago = req.params.id_pago;
    const ID = id_pago;
    const dele = 'DELETE FROM pagos WHERE id_pago = ?';

    conexion.query(dele, ID, (error, result)=>{
        if(error){
            console.log('Error al eliminar el pago', error);
            return res.status(500).send('Error en el servidor...');
        }

        if(result.affectedRows === 0){
            return res.status(404).send('Pago no encontrado....');
        }
        console.log('Pago eliminado exitosamente');
        res.redirect('/admin/pagos');
    });
});

module.exports = router;