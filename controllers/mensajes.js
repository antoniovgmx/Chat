//aquí es mi controlador de conversaciones
//aquí necesitaré utilizar SQL node

const { dbconn } = require('./db_connection');

var mysql = require('mysql');

/* 
    ACTUALIZA LOS MENSAJES 
    UPDATE mensaje SET msgEstado = 0 WHERE idMensaje = (ID DEL MENSAJE);

    */


/* 
    REGRESA TODOS LOS MENSAJES DE LA CONVERSACION DE LOS USUARIOS

SELECT cn.contNombre, m.idMensaje, m.msgTexto, m.msgMultimedia, m.msgFecha as fecha, m.msgEstado
FROM contacto cn, conversacion cv, mensaje  m
WHERE cn.idUsuario = cv.idUsuario AND cn.idContacto = (ID DEL CONTACTO)
AND cn.idUsuario = (ID DEL USUARIO) AND m.idUsuario = cv.idUsuario
AND cn.idContacto = m.idContacto AND m.idContacto = cv.idContacto
AND m.msgEstado = 1 OR m.msgEstado = 2 AND cv.convEstado = 1
UNION
SELECT cn.contNombre, m.idMensaje, m.msgTexto, m.msgMultimedia, m.msgFecha, m.msgEstado
FROM contacto cn, conversacion cv, mensaje  m
WHERE cn.idUsuario = cv.idUsuario AND cn.idContacto = (ID DEL USUARIO)
AND cn.idUsuario = (ID DEL CONTACTO) AND m.idUsuario = cv.idUsuario
AND cn.idContacto = m.idContacto AND m.idContacto = cv.idContacto
AND m.msgEstado = 1 OR m.msgEstado = 2 AND cv.convEstado = 1 ORDER BY fecha;
*/ 

exports.getMensajes = (req, res)=>{
    if(!req.body.idUsuario || !req.body.idDestinatario){
        res.json({
            status : 0,
            msg : 'El campo de idUsuario es necesario',
            data : []
        });
        return;
    }

    db = mysql.createConnection(dbconn);

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
};
