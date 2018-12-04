//Para el manejo de base de datos: https://www.npmjs.com/package/mysql

var mysql = require('mysql');

// var db  = mysql.createConnection({
//     connectionLimit : 10,
//     host            : '198.71.225.60',
//     user            : 'tony',
//     password        : 'tony159',
//     database        : 'chatbetas'
// });


exports.db = mysql.createConnection({
    connectionLimit : 10,
        host            : '198.71.225.60',
        user            : 'tony',
        password        : 'tony159',
        database        : 'chatbetas'
});