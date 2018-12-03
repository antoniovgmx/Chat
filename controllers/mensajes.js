//aquí es mi controlador de conversaciones
//aquí necesitaré utilizar SQL node

//Retorna todos los mensajes de las conversaciones del usuario

exports.getMensajes = (req, res)=>{
    if(!req.body.idUsuario || !req.body.idDestinatario){
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
};
