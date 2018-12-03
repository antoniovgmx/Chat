//Controlador de usuarios
//Para el manejo de base de datos: https://www.npmjs.com/package/mysql
//Para la encriptación de contraseñas: https://www.npmjs.com/package/bcrypt

var bcrypt = require('bcrypt');


//FUNCION DE PRUEBA
exports.test = ()=>{
    res.send({
        data : 'FUNCIONANDO'
    });
}    

//REGISTRO QUE YA FUNCIONA
exports.registro = ( req, res )=>{

    if(!req.body.correo || !req.body.pass){
        res.json({
            status : 0,
            msg : 'El campo de correo y contraseña son obligatorios',
            data : []
        });
        return;
    }

    var hashedPassword = bcrypt.hashSync(req.body.password, 10);

    db.query(`INSERT INTO usuario (userCorreo, userPassword) VALUES ('${req.body.correo}', '${hashedPassword}');`,
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
        db.end((error)=>{
            console.log('Conexion cerrada.');
        });
    });
}

//LOGIN

exports.login = ( req, res )=>{
    if(!req.body.correo || req.body.password){
        res.json({
            status : 0,
            msg : 'Los campos de correo y contraseña son necesarios',
            data : []
        });
        return;
    }

    db.query(`SELECT userCorreo, userPassword FROM usuario WHERE userCorreo="${req.params.correo}";`,
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
}

// db.query(`SELECT * FROM usuario`,
// (error, results, fields)=>{
//    if(error) throw error;
//    console.log(results);
        
// });

exports.getDatos = (req, res)=>{
    if(!req.params.correo){
        res.json({
            status : 0,
            msg : 'El campo de correo es necesarios',
            data : []
        });
        return;
    }

    db.query(`SELECT * FROM usuario WHERE userCorreo="${req.params.correo}";`,
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
            msg : 'Usuario encontrado',
            data : results
        });

    });
}
