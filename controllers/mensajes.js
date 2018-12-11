//aquí es mi controlador de conversaciones
//aquí necesitaré utilizar SQL node

const { dbconn } = require('./db_connection');

var mysql = require('mysql');

exports.getMensajes = (req, res)=>{
    if(!req.params.idUsuario || !req.params.idContacto){
        return res.json({
            status : 0,
            msg : 'El campo de idUsuario es necesario',
            data : []
        }); 
    }

    var db = mysql.createConnection(dbconn);
    db.query(`SELECT m.idMensaje, m.idUsuario, m.idContacto, m.msgTexto, m.msgMultimedia, m.msgFecha, m.msgEstado  FROM mensaje m
              JOIN contacto c ON m.idUsuario = '${req.params.idUsuario}' AND m.idContacto = '${req.params.idContacto}' AND c.contEstado = 1
              UNION  SELECT m.idMensaje, m.idUsuario, m.idContacto, m.msgTexto, m.msgMultimedia, m.msgFecha, m.msgEstado  FROM mensaje m
              JOIN contacto c ON m.idUsuario = '${req.params.idContacto}' AND m.idContacto = '${req.params.idUsuario}' 
              AND (m.msgEstado = 1 OR m.msgEstado = 2) AND c.contEstado = 1 ORDER BY m.msgFecha ASC;`, (error, results, fields)=>{
        if(error){
            console.log(error);
            db.end();
            return res.json({
                status : 0,
                msg : 'Ocurrió un error al realizar la consulta',
                data : error
            });
            
        }
        db.end();
        return res.json({
            status : 1,
            msg : 'Consulta exitosa',
            data : results
        });
    });
};

exports.newMensaje = (req, res)=>{
    if(!req.body.idUsuario || !req.body.mensaje || !req.body.idContacto){
        return res.json({
            status : 0,
            msg : 'Algunos campos necesarios no fueron enviados.',
            data : []
        });
    }

    var db = mysql.createConnection(dbconn);
    db.query(`INSERT INTO mensaje (idUsuario, idContacto, msgTexto, msgMultimedia) VALUES ('${req.params.idUsuario}','${req.params.idContacto}',"${req.body.mensaje}","FOTO");`, (error, results, fields)=>{
        db.end();
        if(error){
            return res.json({
                status : 0,
                msg : 'Ocurrió un error en la consulta',
                data : []
            });
        } else {
            return res.json({
                status : 1,
                msg : 'Mensaje enviado con éxito',
                data : results
            });
        }
    });
};

exports.eliminarMensaje = ()=>{

    if(!req.body.idMensaje){
        return res.json({
            status : 0,
            msg : 'El campo de idMensaje es necesario.',
            data : []
        });
    }

    var db = mysql.createConnection(dbconn);
    db.query(`UPDATE mensaje SET msgEstado = 0 WHERE idMensaje = '${req.body.idMensaje}';`, (error, results, fields)=>{
        if(error){
            db.end();
            return res.json({
                status : 0,
                msg : 'Ocurrió un error al eliminar el mensaje',
                data : []
            });
        }
        db.end();
        if(!results){
            return res.json({
                status : 0,
                msg : 'Mensaje no encontrado',
                data : []
            });
        } else {
            return res.json({
                status : 1,
                msg : 'Mensaje eliminado',
                data : {
                    contacto : req.body.nombre
                }
            });
        }
    });
};
