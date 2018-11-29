
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

//FUNCIÓN AJAX (CONSULTA DE DATOS)
function ajax(config, callback){
	var method = config[0].method;
	var params = Object.entries(config[1]);
	var formatedParams = "";

	for(var [key, value] of params){
		formatedParams += key + "=" + value + "&";

	}
	formatedParams = formatedParams.substring(0, formatedParams.length-1);

	var	petition = new XMLHttpRequest();

	//PETICIÓN
	petition.onreadystatechange = function (){

		if (petition.readyState == 4 && petition.status == 200) {
			callback(petition.responseText);
		}
	}
	switch(method){
		//MÉTODO GET
		case "GET":
			petition.open("GET", URL + config[0].path + "?" + formatedParams);
			petition.send();
			break;

		//MÉTODO POS	
		case "POST":
			petition.open("POST", URL + config[0].path);
			petition.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			petition.send(formatedParams);
			break;
		//OTRO MÉTODO
		default:
			console.log("Método no reconocido");
			break;
	}
}

//OBTIENE LOS DATOS DE LOS INPUT
function getLogin(){
	var user = document.getElementById('logUser').value;
	var password = document.getElementById('logPassword').value;

	login(user,password);

}
//ENVIA LOS DATOS OBTENIDOS
function login(user,password){
	var config = [{
		//MÉTODO
		method: "POST",
		isFormData: false,

		//RUTA POR LA CUAL SE ENVÍA
		path: "login.php", 
		
	},{
		//DATOS A ENVIAR (CORREO Y CONTRASEÑA)
		userCorreo: user, 
		userPassword: password
	}];
	ajax(config,callbackLogin);
}
//RESPUESTA LOGIN
function callbackLogin(response){
	var valid = response;
	//IMPRIME LA RESPUESTA EN CONSOLA
	console.log(response);
	//SPLIT DE LA RESPUESTA
	var res = data.split(",");
		//CONDICIÓN
		for(var i = 0; i < 3; i++){
			if(res[1]=="si"){
			//ALMACENA EN EL LOCALSTORAGE LA VARIABLE 'user'
			localStorage.setItem('user', JSON.stringify(response));
			//REDIRIGE AL INICIO
			location.href='inicio.html';
			}else{
				alert("DATOS INCORRECTOS");
			}
		}
	}
//OBTIENE LOS DATOS DE LOS IMPUT DE REGISTRO
	function getRegistro(){
		var nuser = document.getElementById('nCorreo').value;
		var npass1 = document.getElementById('nPassword1').value;
		var npass2 = document.getElementById('nPassword2').value;
		
		if(nuser != '' && npass1 != '' && npass1 != ''){
			if (npass1 == npass2){
				registro(nuser, npass1);
				document.getElementById('nCorreo').value = '';
				document.getElementById('nPassword1').value = '';
				document.getElementById('nPassword2').value = '';
			}else{
				document.getElementById('inicio').style.display = "none";
				document.getElementById('registro').style.display = "none";
				document.getElementById('alert').style.display = "flex";
			}
		} else {
			document.getElementById('nCorreor').value = '';
			document.getElementById('nPassword1').value = '';
			document.getElementById('nPassword2').value = '';
			
		}
	}