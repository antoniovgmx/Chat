//Controlador de usuarios
//Para el manejo de base de datos: https://www.npmjs.com/package/mysql
//Para la encriptación de contraseñas: https://www.npmjs.com/package/bcrypt

var mysql = require('mysql');
var bcrypt = require('bcrypt');

//Creamos la conexión a la base de datos, 
    //a través del nombre de la variable 
    //de abajo nos referiremos a la base de datos.

var connection  = mysql.createConnection({
    connectionLimit : 10,
    host            : '198.71.225.60',
    user            : 'tony',
    password        : 'tony159',
    database        : 'chatbetas'
});

// //Nos conectamos a la base de datos capturando un posible error
// connection.connect((err)=>{
//     if(err){
//         console.log(console.error('Error conectando: ' + err.stack));
//         return;
//     }
//     console.log('conectado con el id: ' + connection.threadId);
// });

//Manejar una desconexión
connection.on('error', function(err) {
    console.log('Error en la base de datos: ', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      manejarDesconexion();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
function manejarDesconexion(){
    connection.connect((err)=>{
        if(err){
            console.log(console.error('Error reconectando: ' + err.stack));
            return;
        }
        console.log('conectado con el id: ' + connection.threadId);
    });
}

//FUNCIONES EXPORTADAS A 'app.js'
module.exports = (app)=>{

    //FUNCION DE PRUEBA SIN PARAMETROS
    app.get('/api/test/noparams', (req, res)=>{
        res.send({
            data : 'FUNCIONANDO'
        });
    });

    //FUNCION DE PRUEBA CON PARAMETROS
    app.get('/api/test/:params', (req, res)=>{
        res.send({
            data : req.params.params
        });
    });

    //REGISTRO QUE YA FUNCIONA
    app.post('/api/usuarios/registro/:correo/:password',
     (req, res)=>{
        var hashedPassword = bcrypt.hashSync(req.params.password, 10);

        connection.query(`INSERT INTO usuario (userCorreo, userPassword) VALUES ('${req.params.correo}', '${hashedPassword}');`,
        (error, results, fields)=>{
            if(error){
                res.json({
                    status : 0,
                    msg : 'Ocurrió un error al realizar el registro',
                    data : []
                });
                return;
            }
            res.json({
                status : 1,
                msg : 'Usuario creado con éxito',
                data : results
            });
            connection.end((error)=>{
                console.log('Conexion cerrada.');
            });
        });
        
    });

    //LOGIN
    app.get('/api/usuarios/login/:correo/:password', (req, res)=>{
        connection.query(`SELECT userCorreo, userPassword FROM usuario WHERE userCorreo="${req.params.correo}";`,
         (error, results, fields)=>{
            if(error){
                res.json({
                    status : 0,
                    msg : 'Ocurrió un error',
                    data : []
                });
                return;
            }
            var hashedInputPassword = bcrypt.hashSync(req.params.password, 10);
            if(results.userPassword != hashedInputPassword){
                res.json({
                    status : 0,
                    msg : 'El usuario o la contraseña son incorrectas',
                    data : []
                });
                return;
            }

            res.json({
                status : 1,
                msg : 'Usuario autenticado de forma correcta',
                data : results
            });

        });
    });
    // connection.query(`SELECT * FROM usuario`,
    // (error, results, fields)=>{
    //    if(error) throw error;
    //    console.log(results);
          
    // });
    app.get('/api/usuarios/prueba/:correo', (req, res)=>{
        connection.query(`SELECT * FROM usuario WHERE userCorreo="${req.params.correo}";`,
         (error, results, fields)=>{
            if(error){
                res.json({
                    status : 0,
                    msg : 'Ocurrió un error  en la prueba',
                    data : error
                });
                return;
            }

            console.log(results);

            res.json({
                status : 1,
                msg : 'Usuario autenticado de forma correcta',
                data : results
            });

        });
    });
}