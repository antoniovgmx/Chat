function iniciarSesion(){
	var user = document.getElementById('nCorreo').value;
	var password = document.getElementById('nPassword1').value;
	if(user != '' && password != '' && password.length >= 5){
		document.getElementById('Aceptar').style.display = 'inline';
		alert("kncle")
	}
	else{
		document.getElementById('Aceptar').style.display = 'none';
	}

	if(password != '' || nombre != ''){
		Swal(
			'Llene todos los campos',
			'',
			'error'
		)
	}return;
}

function validarRegistro(){
	var usuario = document.getElementById('nNombre').value;
	var nombre = document.getElementById('nCorreo').value;
	var password = document.getElementById('nPassword1').value;
	var confirPassword = document.getElementById('nPassword2').value;


	if(usuario != '' || password != '' || nombre != '' || confirPassword != ''){
		Swal(
			'Llene todos los campos',
			'',
			'error'
		)
	}return;

	if(password !== confirPassword){
		Swal(
			'Las contraseñas no coinciden',
			'Intentelo nuevamente',
			'error'
		)
	}return;

	if(password.length <=8){
		Swal(
			'La contraseña es demasiado corta',
			'Intentelo nuevamente',
			'error'
		)	
		
	}return;

	var bcrypt = require('bcrypt');
	var mysql = require('mysql');
	const { dbconn } = require('./db_connection');

	exports.registro = ( req, res )=>{
	
		var hashedPassword = bcrypt.hashSync(req.body.password, 10);
	
		db = mysql.createConnection(dbconn);
		dbconn.query(`INSERT INTO usuario (userCorreo, userPassword, userNombre) VALUES ('${req.body.correo}', '${hashedPassword}','${req.body.nombre}');`,
		(error, results, fields)=>{
			if(error){
				res.json({
					status : 0,
					msg : 'Ocurrió un error al realizar el registro',
					data : []
				});
				return;
			}
			res.json({
				status : 1,
				msg : 'Usuario creado con éxito',
				data : results
			});

			Swal(
			'La contraseña es demasiado corta',
			'Intentelo nuevamente',
			'error'
		)
			db.end((error)=>{
				console.log('Conexion cerrada.');
			});
		});
	}
}
	
