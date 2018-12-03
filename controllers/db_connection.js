//Para el manejo de base de datos: https://www.npmjs.com/package/mysql

var mysql = require('mysql');

//Creamos la conexión a la base de datos, 
    //a través del nombre de la variable 
    //de abajo nos referiremos a la base de datos.

var db  = mysql.createConnection({
    connectionLimit : 10,
    host            : '198.71.225.60',
    user            : 'tony',
    password        : 'tony159',
    database        : 'chatbetas'
});