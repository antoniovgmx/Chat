// //Controlador de contactos
// //aquí necesitaré utilizar https://www.npmjs.com/package/mysql

// var mysql = require('mysql');

// //Creamos la conexión a la base de datos, 
//     //a través del nombre de la variable 
//     //de abajo nos referiremos a la base de datos.

// var connection = mysql.createConnection({
//     //Aquí van los datos de la bd que utilizaremos
//     host : '',
//     user : '',
//     password : '',
//     database : ''
// });

// //Nos conectamos a la base de datos capturando un posible error
// connection.connect((err)=>{
//     if(err){
//         console.log(console.error('error connecting: ' + err.stack));
//         return;
//     }
//     console.log('connected as id: ' + connection.threadId);
// });