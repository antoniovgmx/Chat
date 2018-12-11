var socket = io();
var datos


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
var idUs = 2;
var ultimoId 

function chat(idDestino) {

    if(ultimoId==idDestino){

        console.log("mismo Chat")

    }else{
         var divCon = document.getElementById("mensajes");
         var numDivs = divCon.childElementCount;
         console.log(numDivs);
         for (var x = 1; x < numDivs; x++) {
             divCon.removeChild(divCon.lastChild);
         }
                        $.ajax({
                            method: "GET",
                            url: "/inicio/chat/mensajes/todos/" + idUs + "/" + idDestino
                        }).done(function (res) {
                            var datos = res.data;
                            var ultimoMensaje = "holaaa";
                            datos.map(item => {
                                console.log(item);
                                var idUsCo = item.idUsuario
                                console.log(idUsCo)
                                var mensaje = item.msgTexto;
                                console.log(mensaje);
                                if (idUsCo == idDestino) {
                                    // var mensaje = document.getElementById("mensajeT").value
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
                                } else {
                                    // var mensaje = item.msgTexto;
                                    // var mensaje = document.getElementById("mensajeT").value
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
                                    var icon = document.createElement("i");
                                    icon.classList.add("far");
                                    icon.classList.add("fa-trash-alt");
                                    icon.classList.add("basura");
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
                            });
                        });

                }

    
            ultimoId = idDestino;
 }

var idMayor
var idMenor
var buttonEnviar = document.getElementById('enviar');
 buttonEnviar.addEventListener("click", function () {
                 var mensaje2 = document.getElementById("mensajeT").value
                 var enviado = document.createElement("DIV");
                 enviado.classList.add("recibido");
                 var divMsg = document.createElement("div");
                 divMsg.classList.add("mensajeR");
                 var pMensaje = document.createElement("P");
                 enviado.appendChild(divMsg);
                 var textnode = document.createTextNode(mensaje2);
                 pMensaje.appendChild(textnode);

                 divMsg.appendChild(pMensaje);

                 var divEliminar = document.createElement("div");
                 divEliminar.classList.add("basura");
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


socket.on('mensajeNuevo', (data)=>{
    //LOGICA PARA DESPLEGAR EL MENSAJE
    console.log(`${data.usuario} : ${data.mensaje}`);
});



















var time = "12:30";
var buttonEnviar = document.getElementById('enviar');
buttonEnviar.addEventListener("click", function () {
    
    ///////////////////////////////scroll hasta abajo//////////////////////////////////////////////////
    var divH = document.getElementById("mensajes").scrollHeight;
    document.getElementById("mensajes").scrollTop = divH;
});
