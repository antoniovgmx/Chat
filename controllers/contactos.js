//Controlador de contactos
//aquí necesitaré utilizar https://www.npmjs.com/package/mysql

var mysql = require('mysql');

const { dbconn } = require('./db_connection');

//Retorna todos los contactos del usuario

exports.getContactos = (req, res)=>{

    console.log("obteniendo contactos")

    if(!req.params.idUsuario){
        return res.json({
            status : 0,
            msg : 'El campo de idUsuario es necesario',
            data : []
        });
    }
    var db = mysql.createConnection(dbconn);
    db.query(`SELECT idContacto, contNombre FROM contacto WHERE idUsuario = ${req.params.idUsuario} AND contEstado = 1;`, (error, results, fields)=>{
       
       db.end();
        if(error){
            //db.end();
            return res.json({
                status : 0,
                msg : 'Ocurrió un error al realizar la consulta',
                data : []
            });
        }
        //db.end();
        return res.json({
            status : 1,
            msg : 'Consulta exitosa',
            data : results
        });
        
    });
}

//NECESITAS CORREO Y EL NOMBRE CON EL QUE LO VAS A GUARDAR

exports.addContacto = (req, res)=>{

    if(!req.body.correo || !req.body.idUsuario || !req.body.nombre){
        return res.json({
            status : 0,
            msg : 'El campo de correo es necesario',
            data : []
        });
    }

    let idContacto;
    var db = mysql.createConnection(dbconn);
    db.query(`SELECT idUsuario FROM usuario WHERE userCorreo = "${req.body.correo}";`, (error, results, fields)=>{
        console.log(`SELECT idUsuario FROM usuario WHERE userCorreo = "${req.body.correo}"`);
        console.log(error);
        if(error){
            db.end();
            return res.json({
                status : 0,
                msg : 'Ocurrió un error al realizar la consulta',
                data : []
            });
        }
        if(!results){
            db.end();
            return res.json({
                status : 0,
                msg : 'Usuario no encontrado',
                data : []
            });
        }
        console.log(results);
        idContacto = results[0].idUsuario;

        db.query(`INSERT INTO contacto (idUsuario, idContacto, contNombre) VALUES ('${req.body.idUsuario}', '${idContacto}', '${req.body.nombre}');`, (error, results, fields)=>{
            if(error){
                console.log(error);
                res.json({
                    status : 0,
                    msg : 'Ocurrió un error al agregar el contacto',
                    data : []
                });
                db.end();
                return;
            }
            if(!results){
                res.json({
                    status : 0,
                    msg : 'Usuario no encontrado',
                    data : []
                });
            } else {
                res.json({
                    status : 1,
                    msg : 'Usuario agregado',
                    data : {
                        contacto : req.body.nombre
                    }
                });
            }
            db.end();
        });
    });

    
}

exports.eliminarContacto = (req, res)=>{
    if(!req.body.idUsuario || !req.body.idContacto){
        res.json({
            status : 0,
            msg : 'El campo de idUsuario o idContacto está vacío',
            data : []
        });
        return;
    }

    var db = mysql.createConnection(dbconn);
    db.query(`UPDATE contacto SET contEstado = 0 WHERE idUsuario = '${req.body.idUsuario}' AND idContacto = '${req.body.idContacto}';`, (error, results, fields)=>{
        if(error){
            db.end();
            return res.json({
                status : 0,
                msg : 'Ocurrió un error al agregar el contacto',
                data : []
            });
        }
        db.end();
        if(!results){
            return res.json({
                status : 0,
                msg : 'Usuario no encontrado',
                data : []
            });
        } else {
            return res.json({
                status : 1,
                msg : 'Usuario eliminado',
                data : {
                    contacto : req.body.nombre
                }
            });
        }
    });
}

exports.bloquearContacto = (req, res)=>{
    var db = mysql.createConnection(dbconn);
    db.query(`UPDATE contacto SET contEstado = 0 WHERE idUsuario = '${req.body.idUsuario}' AND idContacto = '${req.body.idContacto}';`, (error, results, fields)=>{
        if(error){
            db.end();
            return res.json({
                status : 0,
                msg : 'Ocurrió un error al agregar el contacto',
                data : []
            });
        }
        db.end();
        if(!results){
            return res.json({
                status : 0,
                msg : 'Usuario no encontrado',
                data : []
            });
        } else {
            return res.json({
                status : 1,
                msg : 'Usuario bloqueado',
                data : {
                    contacto : req.body.nombre
                }
            });
        }
    });
}

exports.test = (req, res)=>{
    res.json({
        status : 1,
        msg : 'Consulta de prueba exitosa',
        data : []
    });
};
