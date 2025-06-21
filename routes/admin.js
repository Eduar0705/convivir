const express = require('express');
const router = express.Router();
const link = require('../config/link');

router.get("/admin", function(req, res) {
    if (!req.session || !req.session.login) {
        return res.render("index", { mensaje: "Por favor, inicia sesión.", link });
    }
    res.render("admin", { datos: req.session, link });
});
router.get('/admin/registro', (req, res) => {
    if (!req.session.login) {
        return res.render('login', { mensaje: "Inicia sesión", link });
    }
    res.sendFile(path.join(__dirname, '../public/admin/registro.html'));
});


module.exports = router;
