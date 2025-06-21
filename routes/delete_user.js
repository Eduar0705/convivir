const express = require('express');
const router = express.Router();
const conexion = require('../config/conexion');

router.get('/eliminarUsuario/:id', function(req, res) {
    const id = req.params.id;
    const adminPassword = req.query.password; 
    const checkQuery = 'SELECT id_cargo FROM inf_usuarios WHERE id = ?';
    
    conexion.query(checkQuery, [id], function(error, resultados) {
        if (error) {
            console.error('Error al verificar usuario:', error);
            return res.status(500).send('Error del servidor.');
        }

        if (resultados.length === 0) {
            return res.status(404).send('Usuario no encontrado.');
        }

        const esAdministrador = resultados[0].id_cargo === 1;

        if (esAdministrador) {
            const claveCorrecta = "admin123";
            
            if (adminPassword !== claveCorrecta) {
                return res.status(403).send('Clave de administrador requerida');
            }
        }
        const eliminar = 'DELETE FROM inf_usuarios WHERE id = ?';

        conexion.query(eliminar, [id], function(error, resultados) {
            if (error) {
                console.error('Error al eliminar usuario:', error);
                return res.status(500).send('Error del servidor.');
            }

            console.log("Eliminado con éxito");
            res.redirect('/admin/user_admin'); 
        });
    });
});

module.exports = router;