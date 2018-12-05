//Para el manejo de base de datos: https://www.npmjs.com/package/mysql

var mysql = require('mysql');

var dbconn  = {
    connectionLimit : 10,
    host            : '198.71.225.60',
    user            : 'tony',
    password        : 'tony159',
    database        : 'chatbetas'
};

exports.dbconn = dbconn;


exports.getDataContactos = (req, res)=>{
    db = mysql.createConnection(dbconn);
    db.query(`SELECT * FROM contacto;`, (error, results, fields)=>{
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
        db.end((err) => console.log('Closed'));
    });
}

exports.getDataUsuarios = (req, res)=>{
    db = mysql.createConnection(dbconn);
    db.query(`SELECT * FROM usuario;`, (error, results, fields)=>{
        if(error){
            console.log(error);
            
            res.json({
                status : 0,
                msg : 'Ocurrió un error al realizar la consulta',
                data : []
            });
            db.end();
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