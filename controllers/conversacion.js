//Controlador de las conversaciones
var mysql = require('mysql');

const { dbconn } = require('./db_connection');

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

exports.getConversacionesNormales = (req, res)=>{

    if(!req.params.idUsuario){
        return res.json({
            status : 0,
            msg : 'El campo de idUsuario es necesario'
        });
    }

   var db = mysql.createConnection(dbconn);

   var query = `SELECT u.idUsuario, u.userCorreo, c.contNombre, cv.convNombre FROM usuario u JOIN conversacion cv 
   ON cv.idUsuario = '${req.params.idUsuario}' AND cv.idContacto = u.idUsuario AND cv.convEstado = 1 LEFT JOIN contacto c ON  c.idContacto = u.idUsuario 
   AND c.idUsuario = cv.idUsuario UNION SELECT u.idUsuario, u.userCorreo, c.contNombre, cv.convNombre FROM usuario u
   JOIN conversacion cv ON cv.idContacto = '${req.params.idUsuario}' AND cv.idUsuario = u.idUsuario  AND cv.convEstado = 1 LEFT JOIN contacto c 
   ON  c.idContacto = u.idUsuario AND c.idUsuario = cv.idContacto;`

   db.query(query, (error, results)=>{

    if(error){
        db.end();
        return res.json({
            status : 0,
            msg : 'Ocurrió un error en la consulta',
            data : []
        });
    } else {
        db.end();
        return res.json({
            status : 1,
            msg : 'Conversaciones normales',
            data : results
        });
    }

   });

}

exports.getConversacionesArchivadas = (req, res)=>{

    if(!req.params.idUsuario){
        return res.json({
            status : 0,
            msg : 'El campo de idUsuario es necesario'
        });
    }

   var db = mysql.createConnection(dbconn);

   var query = `SELECT u.idUsuario, u.userCorreo, c.contNombre, cv.convNombre FROM usuario u JOIN conversacion cv 
                 ON cv.idUsuario = '${req.params.idUsuario}' AND cv.idContacto = u.idUsuario AND cv.convEstado = 2 LEFT JOIN contacto c ON  c.idContacto = u.idUsuario 
                 AND c.idUsuario = cv.idUsuario UNION SELECT u.idUsuario, u.userCorreo, c.contNombre, cv.convNombre FROM usuario u
                 JOIN conversacion cv ON cv.idContacto = '${req.params.idUsuario}' AND cv.idUsuario = u.idUsuario AND cv.convEstado = 2 LEFT JOIN contacto c 
                 ON  c.idContacto = u.idUsuario AND c.idUsuario = cv.idContacto;`;

   db.query(query, (error, results)=>{

    if(error){
        db.end();
        return res.json({
            status : 0,
            msg : 'Ocurrió un error en la consulta',
            data : []
        });
    } else {
        db.end();
        return res.json({
            status : 1,
            msg : 'Conversaciones archivadas',
            data : results
        });
    }

   });

}

exports.getConversacionesFavoritas = (req, res)=>{

    if(!req.params.idUsuario){
        return res.json({
            status : 0,
            msg : 'El campo de idUsuario es necesario'
        });
    }

   var db = mysql.createConnection(dbconn);

   var query = `SELECT u.idUsuario, u.userCorreo, c.contNombre, cv.convNombre FROM usuario u JOIN conversacion cv 
                 ON cv.idUsuario = '${req.params.idUsuario}' AND cv.idContacto = u.idUsuario AND cv.convEstado = 3 LEFT JOIN contacto c ON  c.idContacto = u.idUsuario 
                 AND c.idUsuario = cv.idUsuario UNION SELECT u.idUsuario, u.userCorreo, c.contNombre, cv.convNombre FROM usuario u
                 JOIN conversacion cv ON cv.idContacto = '${req.params.idUsuario}' AND cv.idUsuario = u.idUsuario AND cv.convEstado = 3 LEFT JOIN contacto c 
                 ON  c.idContacto = u.idUsuario AND c.idUsuario = cv.idContacto;`;

   db.query(query, (error, results)=>{

    if(error){
        db.end();
        return res.json({
            status : 0,
            msg : 'Ocurrió un error en la consulta',
            data : []
        });
    } else {
        db.end();
        return res.json({
            status : 1,
            msg : 'Conversaciones favoritas',
            data : results
        });
    }

   });

}

exports.nuevaConversacion = (req, res)=>{

    if(!req.body.idUsuario || !req.body.idDestinatario){
        return res.json({
            status : 0,
            msg : 'Hay campos que faltan',
            data : []
        });
    }

    idConversacion = null;

    if(req.body.idUsuario < req.body.idDestinatario){
        idConversacion = `${req.body.idUsuario},${req.body.idDestinatario}`;
    } else {
        idConversacion = `${req.body.idDestinatario},${req.body.idUsuario}`;
    }

    var db = mysql.createConnection(dbconn);

    db.query(`CALL nvaConv("${idConversacion}",'${req.body.idUsuario}','${req.body.idDestinatario}');`, (error, results, fields)=>{
        if(error){
            db.end();
            return res.json({
                status : 0,
                msg : 'Ocurrió un error al crear la conversación',
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

}

exports.archivar = (req, res)=>{
    var db = mysql.createConnection(dbconn);
    db.query(`UPDATE conversacion SET convEstado = 2 WHERE idUsuario = '${req.body.idUsuario}' AND idContacto = '${req.body.idContacto}';`, (error, results, fields)=>{
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

exports.eliminar = (req,res)=>{
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
                    // contacto : req.body.nombre
                }
            });
        }
    });
}

exports.favoritear = (req,res)=>{
    if(!req.body.idUsuario || !req.body.idContacto){
        return res.json({
            status : 0,
            msg : 'Faltan campos de idUsuario o idContacto',
            data : []
        });
    }

    var db = mysql.createConnection(dbconn);
    db.query(`UPDATE conversacion SET convEstado = 3 WHERE idUsuario = '${req.params.idUsuario}' AND idContacto = '${req.params.idContacto}';`, (error, results, fields)=>{
        if(error){
            db.end();
            return res.json({
                status : 0,
                msg : 'Ocurrió un error al favoritear la conversacion',
                data : []
            });
        }
        db.end();
        if(!results){
            return res.json({
                status : 0,
                msg : 'Conversación no encontrada',
                data : []
            });
        } else {
            return res.json({
                status : 1,
                msg : 'Conversación favoriteada con éxito',
                data : {
                    // contacto : req.body.nombre
                }
            });
        }
    });
}

