//Controlador de las conversaciones
var mysql = require('mysql');

const { dbconn } = require('./db_connection');

exports.getConversaciones = (req, res)=>{
    if(!req.params.idUsuario){
        res.json({
            status : 0,
            msg : 'El campo de idUsuario es necesario',
            data : []
        });
        return;
    }
    db = mysql.createConnection(dbconn);
    let nombreContacto;

    //CHECAR SI LO TENEMOS AGREGADO
    db.query(`SELECT contNombre FROM contacto WHERE idUsuario = '${req.params.idUsuario}' AND idContacto = '${req.params.idUsuario2}';`, (error, results, fields)=>{
        if(error){
            db.end();
            return res.json({
                status : 0,
                msg : 'Ocurrió un error en la consulta 1',
            });
        }
        //CONSULTAR SU CORREO SI NO LO TENEMOS AGREGADO
        if(!results.nombre){
            db.query(`SELECT userCorreo FROM usuario WHERE idUsuario = '${req.params.idUsuario2}';`, (error, results, fields)=>{
                if(error){
                    db.end();
                    return res.json({
                        status : 0,
                        msg : 'Ocurrió un error en la consulta 2',
                    });
                }
                nombreContacto = results.correo;
            });
        }else nombreContacto = results.nombre;
        //TRAEMOS AHORA SÍ LOS MENSAJES
        db.query(`QUERYTEXT`, (error, results, fields)=>{
            if(error){
                db.end();
                return res.json({
                    status : 0,
                    msg : 'Ocurrió un error en la consulta 3',
                });
            }
            if(!results){
                db.end();
                return res.json({
                    status : 1,
                    msg : 'No hay mensajes en esta conversación'
                });
            }
            return res.json({
                status : 1,
                msg : 'Mensajes encontrados',
                data : results
            });
        });
    });
        
    // db.query(`SELECT idUsuario, userNombre FROM usuario WHERE idUsuario
    //         IN (SELECT idUsuario FROM conversacion WHERE idContacto = '${req.params.idUsuario}' OR idUsuario
    //             IN (SELECT idUsuario FROM mensaje WHERE idContacto = '${req.params.idUsuario}' )AND convEstado = 1)`, (error, results, fields)=>{
    //     if(error){
    //         res.json({
    //             status : 0,
    //             msg : 'Ocurrió un error al realizar la consulta',
    //             data : []
    //         });
    //         return;
    //     }
    //     res.json({
    //         status : 1,
    //         msg : 'Consulta exitosa',
    //         data : results
    //     });
    //     db.end();
    // });

};

exports.getSalas = (req, res)=>{

    if(!req.idUsuario){
        
    }

    db = mysql.createConnection(dbconn);
    db.query(`SELECT convNombre FROM conversacion WHERE (idUsuario = ${req.params.idUsuario} OR idContacto = ${req.params.idUsuario});`, (error, results, fields)=>{

    });
};

exports.archivar = (req, res)=>{
    db = mysql.createConnection(dbconn);
    db.query(`UPDATE conversacion SET convEstado = 2 WHERE idUsuario = '${req.params.idUsuario}' AND idContacto = '${req.params.idContacto}';`, (error, results, fields)=>{
        if(error){
            db.end();
            return res.json({
                status : 0,
                msg : 'Ocurrió un error al archivar la conversacion',
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
                msg : 'Conversación archivada',
                data : results
            });
        }
    });
};

exports.eliminar = ()=>{
    db = mysql.createConnection(dbconn);
    db.query(`UPDATE conversacion SET convEstado = 0 WHERE idUsuario = '${req.params.idUsuario}' AND idContacto = '${req.params.idContacto}';`, (error, results, fields)=>{
        if(error){
            db.end();
            return res.json({
                status : 0,
                msg : 'Ocurrió un error al eliminar la conversacion',
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