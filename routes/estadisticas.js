const express = require('express');
const router = express.Router();
const conexion = require('../config/conexion');
const link = require('../config/link');

router.get('/admin/estadisticas', function(req, res) {
    conexion.query('SELECT * FROM pagos', (err, resultados) => {
        if (err) throw err;
        res.render('admin/estadisticas', {link, results: resultados});
    });
});

module.exports = router;