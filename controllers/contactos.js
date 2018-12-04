//Controlador de contactos
//aquí necesitaré utilizar https://www.npmjs.com/package/mysql

const { db } = require('./db_connection');

//Retorna todos los contactos del usuario

exports.getContactos = (req, res)=>{
    if(!req.params.idUsuario){
        res.json({
            status : 0,
            msg : 'El campo de idUsuario es necesario',
            data : []
        });
        return;
    }

    db.query(`QUERYTEXT`, (error, results, fields)=>{
        if(error){
            res.json({
                status : 0,
                msg : 'Ocurrió un error al realizar la consulta',
                data : []
            });
            return;
        }
        res.json({
            status : 1,
            msg : 'Consulta exitosa',
            data : results
        });
        db.end();
    });
}

exports.addContacto = (req, res)=>{
    if(!req.body.correo){
        res.json({
            status : 0,
            msg : 'El campo de correo es necesario',
            data : []
        });
        return;
    }

    let idContacto;

    db.query(`SELECT idUsuario FROM usuario WHERE userCorreo = "${req.body.correo}";`, (error, results, fields)=>{
        if(error){
            res.json({
                status : 0,
                msg : 'Ocurrió un error al realizar la consulta',
                data : []
            });
            return;
        }
        if(!results){
            res.json({
                status : 0,
                msg : 'Usuario no encontrado',
                data : []
            });
            return;
        }

        // res.json({
        //     status : 1,
        //     msg : 'Consulta exitosa',
        //     data : results
        // });

        idContacto = results.idUsuario;

        db.end();
    });

    db.query(`INSERT INTO contacto (idUsuario, idContacto, contNombre) VALUES ('${idUsuairo}', '${idContacto}', “${req.body.nombre}”);`, (error, results, fields)=>{
        if(error){
            res.json({
                status : 0,
                msg : 'Ocurrió un error al agregar el contacto',
                data : []
            });
            return;
        }
        if(!results){
            res.json({
                status : 0,
                msg : 'Usuario no encontrado',
                data : []
            });
            return;
        }

        res.json({
            status : 1,
            msg : 'Usuario agregado',
            data : {
                contacto : req.body.nombre
            }
        });
        db.end();
    });
}

exports.test = (req, res)=>{
    res.json({
        status : 1,
        msg : 'Consulta de prueba exitosa',
        data : []
    });
};
