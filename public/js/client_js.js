//    var socket = io();
   var time = "12:30";
  var buttonEnviar = document.getElementById('enviar');
             buttonEnviar.addEventListener("click", function(){
               var mensaje = document.getElementById("mensajeT").value
                var enviado = document.createElement("DIV");
                enviado.classList.add("enviado");

                var divMsg = document.createElement("div");
                divMsg.classList.add("mensaje");



                var pMensaje = document.createElement("P");

                // enviado.setAttribute("id", "");
                enviado.appendChild(divMsg);
                var textnode = document.createTextNode(mensaje);
                pMensaje.appendChild(textnode);
                
                divMsg.appendChild(pMensaje);

                 var divEliminar = document.createElement("div");
                 divEliminar.classList.add("eliminar");
                 var icon = document.createElement("i");
                 icon.classList.add("far");
                 icon.classList.add("fa-trash-alt");
                 icon.classList.add("basura");
                 divEliminar.appendChild(icon);
                 enviado.appendChild(divEliminar);

                 var divHora = document.createElement("div");
                 divEliminar.classList.add("hora");
                 var hora = document.createElement("p");
                 var text = document.createTextNode(time)
                 hora.appendChild(text);
                 divHora.appendChild(hora);
                 enviado.appendChild(divHora);


                document.getElementById("mensajes").appendChild(enviado);
///////////////////////////////scroll hasta abajo//////////////////////////////////////////////////
                var divH = document.getElementById("mensajes").scrollHeight
                document.getElementById("mensajes").scrollTop = divH;
            

                // console.log("scroll"+divH);

             });
             

