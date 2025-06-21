const conectar = require("mysql");

//Conexion en el server
const conexion = conectar.createConnection({
    host: "mysql-convivir.alwaysdata.net",
    database: "convivir_bd",
    user: "convivir",
    password: "31466704"
});

//Conexion Local
const conexion1 = conectar.createConnection({
    host: "localhost",
    database: "convivir",
    user: "root",
    password: ""
});

conexion.connect(function(err){
    if (err) {
        throw err;
    }else{
        console.log("Conexión exitosa a la base de datos");
    }
});

module.exports = conexion;