var socket = io();
var datos

var idUs = localStorage.getItem("idUs");
var token = localStorage.getItem("token");



socket.on('connect', ()=>{
    console.log('Conectado al servidor');

        $.ajax({
            method: "GET",
            url: "/inicio/chats/salas/" + idUs
        }).done(function(res){
            console.log(res);
             datos = res.data
        })


    //CONSULTA PARA CONSEGUIR LAS SALAS  |
    //                                   V
    socket.emit('suscribirse', datos, (res)=>{
        console.log(res.msg);
    });
});

socket.on('disconnect', ()=>{
    console.log('Ha ocurrido un error en la conexión, usuario desconectado temporalmente.');
});

 $(document).on("click", "div.texto", function () {
     console.log(this);
     var nombre = $(this).find("h3").get(0);
     console.log(nombre);
 });

var sala
// var nombre
// var idUs = 2;
var ultimoId 

function chat(idDestino) {
    document.getElementById("mensajeT").value ="";
    if(ultimoId==idDestino){
        ultimoId = idDestino;
        return;
    }

    var divCon = document.getElementById("mensajes");
    var numDivs = divCon.childElementCount;
    for (var x = 1; x < numDivs; x++) {
        divCon.removeChild(divCon.lastChild);
    }
    $.ajax({
        method: "GET",
        url: "/inicio/chat/mensajes/todos/" + idUs + "/" + idDestino
    }).done(function (res) {
        var datos = res.data;
        datos.map(item => {
            var idUsCo = item.idUsuario
            var mensaje = item.msgTexto;
            var idMensaje = item.idMensaje;
            
            var tiempo = item.fecha;
        var fecha = new Date(tiempo)
        
        var mes = fecha.getMonth()
        var dia = fecha.getDay()
        var año = fecha.getFullYear()

        var date = ""+dia+"/"+mes+"/"+año+""
            console.log(date,"FECHA")
        var horas = fecha.getHours()
        var minutos = fecha.getMinutes();
        var time = ""+horas+":"+minutos+""
            console.log(time,"hhhh");
            if (idUsCo == idDestino) {
                mensajesEnviados(idMensaje, time, mensaje)
            } else {
                mensajesRecibidos(idMensaje, time, mensaje)
            }
        });
    });
    ultimoId = idDestino;
 }

var idMayor
var idMenor
var buttonEnviar = document.getElementById('enviar');
 buttonEnviar.addEventListener("click", function () {
                 var mensaje2 = document.getElementById("mensajeT").value
                 var enviado = document.createElement("DIV");
                 enviado.classList.add("recibido");
                 enviado.classList.add("msg");
                 var divMsg = document.createElement("div");
                 divMsg.classList.add("mensajeR");
                 var pMensaje = document.createElement("P");
                 enviado.appendChild(divMsg);
                 var textnode = document.createTextNode(mensaje2);
                 pMensaje.appendChild(textnode);

                 divMsg.appendChild(pMensaje);

                 var divEliminar = document.createElement("div");
                 divEliminar.classList.add("basura");
                //  divEliminar.setAttribute("onclick", "eliminarMensaje(" + item.idMensaje + "")
                 var icon = document.createElement("i");
                 icon.classList.add("far");
                 icon.classList.add("fa-trash-alt");
                 icon.classList.add("basuraR");
                 divEliminar.appendChild(icon);
                 enviado.appendChild(divEliminar);

                 var divHora = document.createElement("div");
                 divHora.classList.add("horaR");
                 var hora = document.createElement("p");
                 var text = document.createTextNode(time)
                 hora.appendChild(text);
                 divHora.appendChild(hora);
                 enviado.appendChild(divHora);
                 document.getElementById("mensajes").appendChild(enviado);
                 ///////////////////////////////scroll hasta abajo//////////////////////////////////////////////////
                 var divH = document.getElementById("mensajes").scrollHeight;
                 document.getElementById("mensajes").scrollTop = divH;

                 if(ultimoId<idUs){
                    idMayor=idUs
                    idMenor=ultimoId
                 }else{
                     idMayor = ultimoId
                     idMenor = idUs

                 }

            socket.emit('enviarMensaje', {
                sala: ""+idMenor+","+idMayor+"",
                idUsuario: idUs,
                mensaje: mensaje2,
                idContacto: ultimoId
            }, (resp) => {

                if (resp.status == 0) {
                    console.log('Ocurrió un error');
                } else {
                    console.log('Tú:', resp.mensaje);
                }
            });

             });

//ADD EVENT LISTENER DE 'CLICK' DE BOTÓN DE ENVIAR
//Authorization bearer AJAX JQuery

socket.on('mensajeNuevo', (data)=>{
    var recibido = document.createElement("DIV");
        recibido.classList.add("recibido");
        recibido.classList.add("msg");
        var divMsg = document.createElement("div");
        divMsg.classList.add("mensajeR");
            var pMensaje = document.createElement("P");
            recibido.appendChild(divMsg);
                var textnode = document.createTextNode(data.mensaje);
                pMensaje.appendChild(textnode);
                divMsg.appendChild(pMensaje);

            var divEliminar = document.createElement("div");
            divEliminar.classList.add("basura");
                                    // divEliminar.setAttribute("onclick", "eliminarMensaje(" + item.idMensaje + "")
            var icon = document.createElement("i");
            icon.classList.add("far");
            icon.classList.add("fa-trash-alt");
            icon.classList.add("basuraR");
            divEliminar.appendChild(icon);
            recibido.appendChild(divEliminar);

            var divHora = document.createElement("div");
            divHora.classList.add("horaR");
                var hora = document.createElement("p");
            var text = document.createTextNode(time)
            hora.appendChild(text);
            divHora.appendChild(hora);
            recibido.appendChild(divHora);
            document.getElementById("mensajes").appendChild(recibido);
            var divH = document.getElementById("mensajes").scrollHeight;
            document.getElementById("mensajes").scrollTop = divH;


    // console.log(`${data.usuario} : ${data.mensaje}`);
});




function mensajesEnviados(idMensaje,time,mensaje){

    var enviado = document.createElement("DIV");
    enviado.classList.add("enviado");
    var divMsg = document.createElement("div");
    divMsg.classList.add("mensaje");
    var pMensaje = document.createElement("P");
    enviado.appendChild(divMsg);
    var textnode = document.createTextNode(mensaje);
    pMensaje.appendChild(textnode);

    divMsg.appendChild(pMensaje);

    var divEliminar = document.createElement("div");
    divEliminar.classList.add("basura");
    divEliminar.addEventListener('click', function () {
        eliminarMensaje(divEliminar, idMensaje)
    });
    var icon = document.createElement("i");
    icon.classList.add("far");
    icon.classList.add("fa-trash-alt");
    icon.classList.add("basuraE");
    divEliminar.appendChild(icon);
    enviado.appendChild(divEliminar);

    var divHora = document.createElement("div");
    divHora.classList.add("hora");
    var hora = document.createElement("p");
    var text = document.createTextNode(time)
    hora.appendChild(text);
    divHora.appendChild(hora);
    enviado.appendChild(divHora);
    document.getElementById("mensajes").appendChild(enviado);

    var divH = document.getElementById("mensajes").scrollHeight;
    document.getElementById("mensajes").scrollTop = divH;
}

function mensajesRecibidos(idMensaje,time,mensaje){
      var recibido = document.createElement("DIV");
                                     recibido.classList.add("recibido");
                                     var divMsg = document.createElement("div");
                                     divMsg.classList.add("mensajeR");
                                     var pMensaje = document.createElement("P");
                                     recibido.appendChild(divMsg);
                                     var textnode = document.createTextNode(mensaje);
                                     pMensaje.appendChild(textnode);


                                     divMsg.appendChild(pMensaje);

                                     var divEliminar = document.createElement("div");
                                     divEliminar.classList.add("basura");
                                    //  divEliminar.setAttribute("onclick", "eliminarMensaje(" + idMensaje + ")")
                                     divEliminar.addEventListener('click', function () {
                                         eliminarMensaje(divEliminar, idMensaje)
                                     });
                                     var icon = document.createElement("i");
                                     icon.classList.add("far");
                                     icon.classList.add("fa-trash-alt");
                                     icon.classList.add("basuraR");
                                     divEliminar.appendChild(icon);
                                     recibido.appendChild(divEliminar);

                                     var divHora = document.createElement("div");
                                     divHora.classList.add("horaR");
                                     var hora = document.createElement("p");
                                     var text = document.createTextNode(time)
                                     hora.appendChild(text);
                                     divHora.appendChild(hora);
                                     recibido.appendChild(divHora);
                                     document.getElementById("mensajes").appendChild(recibido);
                                     var divH = document.getElementById("mensajes").scrollHeight;
                                     document.getElementById("mensajes").scrollTop = divH;
}

function eliminarMensaje(divEl, x) {
    Swal({
        title: '¿Deseas eliminar este mensaje?',
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si'
    }).then((result) => {
        socket.emit('eliminarMensaje',{
            idMensaje: x
        },(resp)=>{
            if(resp.status==1 && result.value){
                 var padre = $(divEl).parent()
                 padre.remove();
                 Swal(
                     'Eliminado',
                     'el mensje ha sido eliminado',
                     'success'
                 )
            }else{
                 Swal(
                     'Error',
                     'Error al eliminar mensaje',
                     'error'
                 )
            }
        })

    });
}

