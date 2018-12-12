const jwt = require('jsonwebtoken');

exports.verifyToken = (token)=>{

    try {
        var decoded = jwt.verify(token, 'perrito');
    } catch(err) {
        return res.json({
            status : 403,
            msg : 'Acceso denegado, login requerido',
            data : []
        });
    }

}

    