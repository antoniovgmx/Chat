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

		/* 
		VER NOMBRE DE USUARIO
		SELECT idUsuario, userNombre FROM usuario WHERE idUsuario
			IN (SELECT idUsuario FROM conversacion WHERE idContacto = (ID USUARIO) OR idUsuario
			    IN (SELECT idUsuario FROM mensaje WHERE idContacto = (ID USUARIO) )AND convEstado = 1)
		
		VER ÚLTIMO MENSAJE 
		SELECT * FROM mensaje WHERE idContacto = (ID USUARIO) AND idUsuario = (ID CONTACTO [el de arriba])
			AND msgEstado = 1 OR msgEstado = 2 ORDER BY msgFecha DESC LIMIT 1;

		*/
    db.query(`SELECT idContacto, contNombre FROM contacto WHERE idUsuario = ${req.params.idUsuario} AND contEstado = 1;`, (error, results, fields)=>{
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

exports.archivar = ()=>{
    db = mysql.createConnection(dbconn);
    db.query(`QUERYTEXT`, (error, results, fields)=>{
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
                msg : 'Conversación archivada',
                data : results
            });
        }
    });
};

exports.eliminar = ()=>{
    db = mysql.createConnection(dbconn);
    db.query(`QUERYTEXT`, (error, results, fields)=>{
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