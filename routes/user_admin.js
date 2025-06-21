const express = require('express');
const router = express.Router();
const conexion = require('../config/conexion');
const link = require('../config/link');

router.get('/admin/user_admin', function(req, res) {
    conexion.query('SELECT * FROM inf_usuarios', (err, resultados) => {
        if (err) throw err;
        res.render('admin/user_admin', {link, avisos: resultados});
    });
});

module.exports = router;