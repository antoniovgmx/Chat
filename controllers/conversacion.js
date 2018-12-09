//Controlador de las conversaciones
var mysql = require('mysql');

const { dbconn } = require('./db_connection');

exports.getConversaciones = (req, res)=>{

    // return res.json({ status : 1 });

    if(!req.params.idUsuario){
        return res.json({
            status : 0,
            msg : 'El campo de idUsuario es necesario'
        });
    }

   var db = mysql.createConnection(dbconn);

   //CONVERSACION (ARCHIVADA)
   /* 
   SELECT u.idUsuario, u.userCorreo, c.contNombre, cv.convNombre FROM usuario u JOIN conversacion cv 
              ON cv.idUsuario = '${req.params.idUsuario}' AND cv.idContacto = u.idUsuario LEFT JOIN contacto c ON  c.idContacto = u.idUsuario 
              AND c.idUsuario = cv.idUsuario AND cv.convEstado = 2 UNION SELECT u.idUsuario, u.userCorreo, c.contNombre, cv.convNombre FROM usuario u
              JOIN conversacion cv ON cv.idContacto = '${req.params.idUsuario}' AND cv.idUsuario = u.idUsuario LEFT JOIN contacto c 
              ON  c.idContacto = u.idUsuario AND c.idUsuario = cv.idContacto AND cv.convEstado = 2;   */

    //CONVERSACION (FAVORITA)
    /*
    SELECT u.idUsuario, u.userCorreo, c.contNombre, cv.convNombre FROM usuario u JOIN conversacion cv 
              ON cv.idUsuario = '${req.params.idUsuario}' AND cv.idContacto = u.idUsuario LEFT JOIN contacto c ON  c.idContacto = u.idUsuario 
              AND c.idUsuario = cv.idUsuario AND cv.convEstado = 3 UNION SELECT u.idUsuario, u.userCorreo, c.contNombre, cv.convNombre FROM usuario u
              JOIN conversacion cv ON cv.idContacto = '${req.params.idUsuario}' AND cv.idUsuario = u.idUsuario LEFT JOIN contacto c 
              ON  c.idContacto = u.idUsuario AND c.idUsuario = cv.idContacto AND cv.convEstado = 3;

              */      
    
    //CONVERSACION (NORMAL)
    db.query(`SELECT u.idUsuario, u.userCorreo, c.contNombre, cv.convNombre FROM usuario u JOIN conversacion cv 
              ON cv.idUsuario = '${req.params.idUsuario}' AND cv.idContacto = u.idUsuario LEFT JOIN contacto c ON  c.idContacto = u.idUsuario 
              AND c.idUsuario = cv.idUsuario AND cv.convEstado = 1 UNION SELECT u.idUsuario, u.userCorreo, c.contNombre, cv.convNombre FROM usuario u
              JOIN conversacion cv ON cv.idContacto = '${req.params.idUsuario}' AND cv.idUsuario = u.idUsuario LEFT JOIN contacto c 
              ON  c.idContacto = u.idUsuario AND c.idUsuario = cv.idContacto AND cv.convEstado = 1;`, (error, results)=>{
        if(error){
            db.end();
            return res.json({
                status : 0,
                msg : 'Ocurrió un error en la consulta 1',
                data : []
            });
        } else {
            if(!results.nombre){
                db.query(`SELECT userCorreo FROM usuario WHERE idUsuario = '${req.params.idUsuario2}';`,(error, results)=>{
                    if(error){
                        db.end();
                        return res.json({
                            status : 0,
                            msg : 'Ocurrió un error en la consulta 2',
                            data : []
                        });
                    } else {
                        db.query(`QUERYTEXT`, (error, results)=>{
                            if(error){
                                db.end();
                                return res.json({
                                    status : 0,
                                    msg : 'Ocurrió un error en la consulta 3',
                                    data : []
                                });
                            } else {
                                db.end();
                                return res.json({
                                    status : 1,
                                    msg : 'Mensajes encontrados',
                                    data : results
                                });
                            }
                        });
                    }
                });
            } else {
                db.query(`QUERYTEXT`, (error, results)=>{
                    if(error){
                        db.end();
                        return res.json({
                            status : 0,
                            msg : 'Ocurrió un error en la consulta 3',
                            data : []
                        });
                    } else {
                        db.end();
                        return res.json({
                            status : 1,
                            msg : 'Mensajes encontrados',
                            data : results
                        });
                    }
                });
            }
        }
    });

};

exports.getSalas = (req, res)=>{

    if(!req.params.idUsuario){
       return res.json({
           status : 0,
           msg : 'El campo de idUsuario es necesario'
       }); 
    }

    var db = mysql.createConnection(dbconn);
    db.query(`SELECT convNombre FROM conversacion WHERE (idUsuario = ${req.params.idUsuario} OR idContacto = ${req.params.idUsuario});`, (error, results, fields)=>{

        if(error){
            db.end();
            console.log("error consulta")
            return res.json({
                status : 0,
                msg : 'Ocurrió un error en la consulta'
            });
        }
        db.end();
        console.log("conexion cerrada")
        return res.json({
            status : 1,
            msg  : 'Consulta realizada con exito',
            data : results
        });
    });
};

exports.archivar = (req, res)=>{
    var db = mysql.createConnection(dbconn);
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
    var db = mysql.createConnection(dbconn);
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