const express = require('express');
const router = express.Router();
const conexion = require('../config/conexion');

router.delete('/deleEstadisticas/:id_mesualidad', (req, res) => {
    const id_mesualidad = req.params.id_mesualidad;

    if(!Number.isInteger(Number(id_mesualidad)) || Number(id_mesualidad) <= 0) {
        return res.status(400).json({ error: 'ID no válido' });
    }

    const dele = `DELETE FROM pagosMesualidad WHERE id_mesualidad = ?`;

    conexion.query(dele, [id_mesualidad], (err, result) => {
        if(err) {
            console.error('Error al eliminar la estadística', err);
            return res.status(500).json({ error: "Error en el servidor" });
        }
        
        if(result.affectedRows === 0) {
            return res.status(404).json({ error: "Estadística no encontrada" });
        }

        console.log('Estadística eliminada exitosamente');
        return res.status(200).json({ message: 'Estadística eliminada correctamente' });
    });
});

module.exports = router;