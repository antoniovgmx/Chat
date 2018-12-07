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

    db = mysql.createConnection(dbconn);
    db.query(`SELECT * FROM mensaje WHERE idUsuario = '${req.params.idUsuario}' AND idContacto = '${req.params.idContacto}'
                UNION SELECT * FROM mensaje WHERE idUsuario = '${req.params.idContacto}' AND idContacto = '${req.params.idUsuario}' 
                AND (msgEstado = 1 OR msgEstado = 2) ORDER BY msgFecha ASC;`, (error, results, fields)=>{
        if(error){
            console.log(error);
            return res.json({
                status : 0,
                msg : 'Ocurrió un error al realizar la consulta',
                data : error
            });
            
        }
        return res.json({
            status : 1,
            msg : 'Consulta exitosa',
            data : results
        });
    });
};

exports.newMensaje = (req, res)=>{
    if(!req.body.idUsuario || !req.body.mensaje){
        return res.json({
            status : 0,
            msg : 'El campo de idUsuario o el mensaje es nulo',
            data : []
        });
    }

    db = mysql.createConnection(dbconn);
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

    

    db = mysql.createConnection(dbconn);
    db.query(`UPDATE mensaje SET msgEstado = 0 WHERE idMensaje = '${req.params.idMensaje}';`, (error, results, fields)=>{
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
