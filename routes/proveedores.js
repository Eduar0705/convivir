const express = require('express');
const router = express.Router();
const conexion = require('../config/conexion');
const link = require('../config/link');

router.get('/admin/proveedores', function(req, res) {
    conexion.query('SELECT * FROM proveedores', (err, resultados) => {
        if (err) throw err;
        res.render('admin/proveedores', {link, provedores: resultados});
    });
});


module.exports = router;