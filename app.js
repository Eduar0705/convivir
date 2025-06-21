//IMPORTAR LIBRERIAS
const express = require('express');
const session = require('express-session');
const app = express();


//CONFIGURACIONES
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Configuración de express-session con Redis
app.use(session({
    secret: process.env.SESSION_SECRET || 'tu_clave',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

//RUTAS ESTATICAS
app.use(express.static('public'));

//RUTAS DE ADMIN
app.use(require('./routes/login'));
app.use(require('./routes/regUsuario'));
app.use(require('./routes/regUsuario_admin'));
app.use(require('./routes/codLogin'));
app.use(require('./routes/admin'));
app.use(require('./routes/avisos'));
app.use(require('./routes/user_admin'));
app.use(require('./routes/pagos'));
app.use(require('./routes/estadisticas'));
app.use(require('./routes/proveedores'));

//ELIMINAR USUARIO
app.use(require('./routes/delete_user'));

//ELIMINAR PAGO
app.use(require('./routes/delete_pago'));

//ELIMINAR PROVEEDOR
app.use(require('./routes/dele_prove'));

//RUTAS USUARIOS
app.use(require('./routes/users'));
app.use(require('./routes/aggPagos'));
app.use(require('./routes/avisosUsuario'));

//PUERTO DEL SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    if(PORT === 3000){
        console.log("http://localhost:3000");
    } else {
        console.log(PORT);
    }
});