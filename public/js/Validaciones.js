function iniciarSesion(){
	var user = document.getElementById('user').value;
	var password = document.getElementById('pass').value;
	if(user != '' && password != '' && password.length >= 5){
		document.getElementById('btnEnviar').style.display = 'inline';
	}
	else{
		document.getElementById('btnEnviar').style.display = 'none';
	}
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
	}

	if(password !== confirPassword){
		Swal(
			'Las contraseñas no coinciden',
			'Intentelo nuevamente',
			'error'
		)
	}

	if(password.length <=8){
		Swal(
			'La contraseña es demasiado corta',
			'Intentelo nuevamente',
			'error'
		)	
		
	}
}
