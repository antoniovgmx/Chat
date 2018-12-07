
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

//SNOW
(function($){$.fn.snow=function(options){var $flake=$('<div id="background-web" />').css({'position':'absolute','top':'-50px'})
	.html('&#10052;'),documentHeight=$(document).height(),documentWidth=$(document).width(),defaults={minSize:10,maxSize:20,newOn:500,flakeColor:"#FFFFFF"},options=$.extend({},defaults,options);
	var interval=setInterval(function()
	{var startPositionLeft=Math.random()*documentWidth-100,startOpacity=0.5+Math.random(),sizeFlake=options.minSize+Math.random()*options.maxSize,endPositionTop=documentHeight-40,
		endPositionLeft=startPositionLeft-100+Math.random()*200,durationFall=documentHeight*10+Math.random()*5000;$flake.clone().appendTo('body')
	.css({left:startPositionLeft,opacity:startOpacity,'font-size':sizeFlake,color:options.flakeColor})
	.animate({top:endPositionTop,left:endPositionLeft,opacity:0.2},durationFall,'linear',function(){$(this).remove()});},options.newOn);};})(jQuery);


	//  var pass = document.getElementById("logPassword").value;
	//  var usua = document.getElementById("logUser").value;

	function login() {
		alert("hhhhh")
		
		var pass = document.getElementById("logPassword").value;
		var usua = document.getElementById("logUser").value;
			console.log(usua);
			console.log(pass);
		if (usua != '' && pass != '') {
			$.ajax({
				method: "POST",
				url: "/api/usuarios/login",
				data: {
					"correo": ""+usua+"",
					"password": ""+pass+""
				}
			}).done(function (res) {
				console.log(res);
			})
			
		} else {
			if (pass != '' || usua != '') {

				Swal({
					position: 'center',
					type: 'error',
					title: 'Llena todos los campos',
					heightAuto: false,
					width: '20%',
					showConfirmButton: false,
					timer: 1500
				})
			}
		}
		
	}

	function Registro(){
		// var pass2 = document.getElementById("nPassword2").value;
		// var pass1 = document.getElementById("nPassword1").value;
		// var correoR = document.getElementById("nCorreo").value;
		// var usua = document.getElementById("logUser").value;

			var nombre = document.getElementById('nNombre').value;
			var correo = document.getElementById('nCorreo').value;
			var password = document.getElementById('nPassword1').value;
			var confirPassword = document.getElementById('nPassword2').value;


			if (correo == '' || password == '' || nombre == '' || confirPassword == '') {
				Swal(
					'Llene todos los campos',
					'',
					'error'
				)
			}else{
					if (password.length <= 8) {
						Swal(
							'La contraseña es demasiado corta',
							'Intentelo nuevamente',
							'error'
						)

					}else{
							if (password !== confirPassword) {
								Swal(
									'Las contraseñas no coinciden',
									'Intentelo nuevamente',
									'error'
								)
							}else{
									$.ajax({
										method: "POST",
										url: "/api/usuarios/registro",
										data: {
											"nombre":""+nombre+"",
											"correo": "" + correo + "",
											"pass": "" + password + ""
										}
									}).done(function (res) {
										console.log(res);
										if(res.status == 1){
											Swal({
												position: 'center',
												type: 'success',
												title: 'Usuario creado correctamente',
												showConfirmButton: false,
												timer: 1500
											})
										}
										var datos = res.data;
										console.log(datos);
										 datos.map(item => {
											var idUs = item.insertId;
											localStorage.setItem("idUs", idUs);
										 })
										 redireccionar();
									})
							}}
						}
					
			}

			function redireccionar() {
				window.locationf = "http://localhost:3000/inicio.html";
			}

		