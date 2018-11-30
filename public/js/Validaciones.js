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
	var nombre = document.getElementById('nCorreo').value;
	var password = document.getElementById('nPassword1').value;
	var confirPassword = document.getElementById('nPassword2').value;

	if (password !== confirPassword){
		alert('Las contraseñas no coinciden')
	}
	
		
	if(password != '' && nombre != '' && confirPassword != ''){
		if(password.length >= 5 && confirPassword.length >= 5){
			document.getElementById('Aceptar').style.display = 'inline';
		}else{
			alert('Contraseña muy corta');
			
		}
	}
}


