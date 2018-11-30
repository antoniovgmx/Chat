
//MOSTRAR EL DIV DE REGISTRO DE USUARIO
function mostrarRegistro() {
	document.getElementById('form').style.display = "none";
	document.getElementById('registro').style.display = "flex";
}

//MOSTRAR EL DIV DE INICIO DE SESIÓN DEL USUARIO
function mostrarInicio() {
	document.getElementById('form').style.display = "flex";
	document.getElementById('registro').style.display = "none";
}
