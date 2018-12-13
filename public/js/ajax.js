//////////////CONTACTOS/////////////////////////////////////////////////
var correo = "aixa@gmail.com";
var idUs = localStorage.getItem("idUs");
var token = localStorage.getItem("token");
var correoStorage = localStorage.getItem("correo");

obtenerContactos();

function crearElementosContactos(idCon, nomCon) {
    var contenedores = document.getElementById("contenedoresCon");
    var contenedor = document.createElement("DIV");
    contenedor.classList.add("contenedor");
    contenedor.setAttribute("id", "cont" + idCon + "");
    var imgCon = document.createElement("DIV")
    imgCon.classList.add("imgUsuario");
    var lado = document.createElement("DIV");
    lado.classList.add("lado");
    var puntitos = document.createElement("DIV")
    puntitos.classList.add("mas")
    puntitos.classList.add("masCon");
    puntitos.setAttribute("id", "mas2");
    puntitos.setAttribute('data-menu', 'menuConv');
    var iconPun = document.createElement("I");
    iconPun.classList.add("fas")
    iconPun.classList.add("fa-ellipsis-v");
    var cuadrito = document.createElement("DIV")
    cuadrito.classList.add("cuadrito")
    cuadrito.classList.add("cuadroChats")
    var pEliminar = document.createElement("P")
            pEliminar.classList.add("bloquearCon");
            pEliminar.setAttribute("id", "eliminarCon");
            pEliminar.setAttribute("onclick","eliminarCon("+idCon+")")
            var textEli = document.createTextNode("Eliminar")
        pEliminar.appendChild(textEli);
    var pBloquear = document.createElement("P")
            pBloquear.classList.add("bloquearCon");
            pBloquear.setAttribute("id", "bloquearCon");
            pBloquear.setAttribute("onclick", "BloquearCon(" + idCon + ")")
            var textArc = document.createTextNode("Bloquear")
        pBloquear.appendChild(textArc);
    cuadrito.appendChild(pEliminar);
    cuadrito.appendChild(pBloquear);
    lado.appendChild(puntitos);
    puntitos.appendChild(iconPun);
    puntitos.appendChild(cuadrito);
    lado.appendChild(puntitos);
    var divtText = document.createElement("DIV");
    divtText.classList.add("texto")
    divtText.classList.add("textCon")
    divtText.setAttribute("onclick", "conversacionNueva(" + idCon + ")");
    var nombreCon = document.createElement("H3");
    var nombre = document.createTextNode(nomCon);
    nombreCon.appendChild(nombre);
    divtText.appendChild(nombreCon);

    contenedor.appendChild(imgCon);
    contenedor.appendChild(divtText);
    contenedor.appendChild(lado);
    contenedores.appendChild(contenedor);
}

//////////////////////////AJAX OBTENER CONTACTOS////////////////////////////////
function obtenerContactos(){
    $.ajax({
        method: "POST",
        url: "/api/usuarios/autenticacion",
        data:{
            token: token
        }  
    }).done(function (res) {
        console.log(res)
        if (res.status == 403) {
           window.location.href = "http://localhost:3000";
        } else {
            if (res.status == 200) {
               $.ajax({
                   method: "GET",
                   url: "http://localhost:3000/inicio/contactos/todos/" + idUs
               }).done(function (res) {
                   console.log(res)
                   var datos = res.data;
                   datos.map(item => {
                       console.log(item);

                       var itemNombre = item.contNombre
                       var itemId = item.idContacto
                       crearElementosContactos(itemId, itemNombre);
                   });
               });
                
            }
        }
    })
    
}

////////////////////////CHATS ELEMENTOS Y AJAX///////////////////////////////////

function crearElementosChats(idUsua, nombreUsua) {
var ultimoMensaje="Holaaa";
    var contenedores = document.getElementById("contenedores");
    var contenedor = document.createElement("DIV");
    contenedor.classList.add("contenedor");
    contenedor.setAttribute("id", "cont");
    contenedor.setAttribute("onclick", "chat(" + idUsua + ")");
    var divImgUs = document.createElement("DIV");
    divImgUs.classList.add("imgUsuario");
    var divTexto = document.createElement("DIV");
    divTexto.classList.add("texto");
    divTexto.setAttribute("div", "texto");
    var nombreChat = document.createElement("H3");
    var nombre2 = document.createTextNode(nombreUsua);
    nombreChat.appendChild(nombre2);
    var conversacion = document.createElement("P");
    var textoConve = document.createTextNode(ultimoMensaje);
    conversacion.appendChild(textoConve);

    divTexto.appendChild(nombreChat);
    divTexto.appendChild(conversacion);
    contenedor.appendChild(divImgUs);
    contenedor.appendChild(divTexto);

    var divLado = document.createElement("DIV");
    divLado.classList.add("lado");
    var divMas = document.createElement("DIV");
    divMas.classList.add("mas");
    divMas.setAttribute("div", "mas");
    var iconMas = document.createElement("I")
    iconMas.classList.add("fas")
    iconMas.classList.add("fa-ellipsis-v")
    var divCuadrito = document.createElement("DIV");
    divCuadrito.classList.add("cuadrito")
    divCuadrito.classList.add("cuadroChats")
    divCuadrito.setAttribute("id", "cuadroChats");
    var pEliminar = document.createElement("P")
            pEliminar.classList.add("eliminarChat");
            pEliminar.setAttribute("id", "eliminarChat");
            var textEli = document.createTextNode("Eliminar")
            pEliminar.setAttribute("onclick", "eliminarChat(" + idUsua + ")")
        pEliminar.appendChild(textEli);
    var pArchivar = document.createElement("P")
            pArchivar.classList.add("archivarChat");
            pArchivar.setAttribute("id", "archivarChat");
            var textArc = document.createTextNode("Archivar")
            pArchivar.setAttribute("onclick", "ArchivarChat(" + idUsua + ")")
        pArchivar.appendChild(textArc);
    var pFavorito = document.createElement("P")
            pFavorito.classList.add("favoritoChat");
            pFavorito.setAttribute("id", "favoritoChat");
            var textFav = document.createTextNode("Favorito")
            pFavorito.setAttribute("onclick", "favoritoChat(" + idUsua + ")")
        pFavorito.appendChild(textFav);
    divCuadrito.appendChild(pEliminar);
    divCuadrito.appendChild(pArchivar);
    divCuadrito.appendChild(pFavorito);
    divMas.appendChild(iconMas);
    divMas.appendChild(divCuadrito);
    divLado.appendChild(divMas);
    contenedor.appendChild(divLado);

    contenedores.appendChild(contenedor);
}
///////////////////AJAX OBTENER CONVERSACIONES CHATS////////////////
$.ajax({
    method: "POST",
    url: "/api/usuarios/autenticacion",
    data:{
        token: token
    }
}).done(function (res) {
    console.log(res)
    if (res.status == 403) {
       window.location.href = "http://localhost:3000";
    } else {
        if (res.status == 200) {
              $.ajax({
                  method: "GET",
                  url: "http://localhost:3000/inicio/chat/conversaciones/normales/" + idUs
              }).done(function (res) {
                  console.log(res);
                  var datos = res.data
                  datos.map(item => {
                      console.log(item)
                      var idCon = item.idUsuario;
                      var nombreChat = item.contNombre;
                      crearElementosChats(idCon, nombreChat);
                  })

              });
        }
    }
})



////////////////////////////////////////////////////////////////////


/////////// CREACION DE CUADORS DE EMENSAJES ////////////////////////
// var time = "12:30";
// var buttonEnviar = document.getElementById('enviar');
// buttonEnviar.addEventListener("click", function () {
//     var mensaje = document.getElementById("mensajeT").value
//     var enviado = document.createElement("DIV");
//     enviado.classList.add("recibido");
//     var divMsg = document.createElement("div");
//     divMsg.classList.add("mensajeR");
//     var pMensaje = document.createElement("P");
//     enviado.appendChild(divMsg);
//     var textnode = document.createTextNode(mensaje);
//     pMensaje.appendChild(textnode);

//     divMsg.appendChild(pMensaje);

//     var divEliminar = document.createElement("div");
//     divEliminar.classList.add("basura");
//     var icon = document.createElement("i");
//     icon.classList.add("far");
//     icon.classList.add("fa-trash-alt");
//     icon.classList.add("basuraR");
//     divEliminar.appendChild(icon);
//     enviado.appendChild(divEliminar);

//     var divHora = document.createElement("div");
//     divHora.classList.add("horaR");
//     var hora = document.createElement("p");
//     var text = document.createTextNode(time)
//     hora.appendChild(text);
//     divHora.appendChild(hora);
//     enviado.appendChild(divHora);
//     document.getElementById("mensajes").appendChild(enviado);
//     ///////////////////////////////scroll hasta abajo//////////////////////////////////////////////////
//     var divH = document.getElementById("mensajes").scrollHeight;
//     document.getElementById("mensajes").scrollTop = divH;
// });

// function chat(idDestino) {
//     $.ajax({
//         method: "GET",
//         url: "/inicio/chat/mensajes/todos/" + idUs + "/" + idDestino
//     }).done(function (res) {
//         var datos = res.data;
//         var ultimoMensaje = "holaaa";
//         datos.map(item => {
//             console.log(item);

//         });
//     });
// }

//////////////////////CUADRO AGREGAR////////////////////////////
var botnAgregar = document.getElementById("agregarContacto");
botnAgregar.addEventListener("click", function(){
   var correoCon = document.getElementById("correoCon").value
   var nombreCon = document.getElementById("nombreCon").value
    console.log(idUs);
   console.log(correoCon);
   console.log(nombreCon);

    ajax(nombreCon,correoCon)
})
    /////////////////////AJAX AGREGAR////////////
function ajax(nombreCon,correoCon){
$.ajax({
    method: "POST",
    url: "/api/usuarios/autenticacion",
    data:{
        token: token
    }
    
}).done(function (res) {
    console.log(res)
    if (res.status == 403) {
        window.location.href = "http://localhost:3000";
    } else {
        if (res.status == 200) {
            $.ajax({
                method: "POST",
                url: "/inicio/contactos/agregar",
                data: {
                    "nombre": "" + nombreCon + "",
                    "correo": "" + correoCon + "",
                    "idUsuario": "" + idUs + ""
                }
            }).done(function (res) {
                /////////////////////////CREAR HIJO////////////////////////
                var data = res.data;
                console.log(res.data);
                var divCon = document.getElementById("contenedoresCon");
                var numDivs = divCon.childElementCount;
                console.log(numDivs);
                for (var x = 1; x < numDivs; x++) {
                    divCon.removeChild(divCon.lastChild);
                }
                obtenerContactos();
            })
        }
    }
})

        
}
///////////////////////////////////////////////////////////////////////


// $.ajax({
//     method: "GET",
//     url: "http://localhost:3000/inicio/chats/salas/" + idUs
// }).done(function (res) {
//     console.log(res);
//     var datos = res.data;
//     datos.map(item => {
//     });
// });


function eliminarChat(idChat){

$.ajax({
    method: "POST",
    url: "/api/usuarios/autenticacion",
    data:{
        token: token
    }
   
}).done(function (res) {
    console.log(res)
    if (res.status == 403) {
        window.location.href = "http://localhost:3000";
    } else {
        if (res.status == 200) {
           $.ajax({
               method: "DELETE",
               url: "http://localhost:3000/inicio/chat/conversaciones/eliminar",
               data: {
                   idUsuario: idUs,
                   idContacto: idChat
               }
           }).done(function (res) {
               console.log(res)
               var status = res.status;

               if (status == 1) {
                   Swal({
                       position: 'center',
                       type: 'success',
                       title: 'Chat eliminado',
                       showConfirmButton: false,
                       timer: 1500
                   })
               }

           })
        }
    }
})

        
}

var fav = document.getElementById("favoritos")
fav.addEventListener("click",function(){
    fav.style.background = "rgba(64, 33,74,.95)";
    fav.style.color = "white";
    todos.style.background = "none";
    todos.style.color="grey"
    archi.style.background = "none";
    archi.style.color = "grey"
$.ajax({
    method: "POST",
    url: "/api/usuarios/autenticacion",
    data:{
        token: token
    }  
}).done(function (res) {
    console.log(res)
    if (res.status == 403) {
        window.location.href = "http://localhost:3000";
    } else {
        if (res.status == 200) {
           $.ajax({
               method: "GET",
               url: "http://localhost:3000/inicio/chat/conversaciones/favoritas/" + idUs
           }).done(function (res) {
               console.log(res)
               var divCon = document.getElementById("contenedores");
               var numDivs = divCon.childElementCount;
               for (var x = 0; x < numDivs; x++) {
                   divCon.removeChild(divCon.lastChild);
               }
               var datos = res.data;
               var ultimoMensaje = "holaaa";
               datos.map(item => {
                   // console.log(item);
                   var itemIdU = item.idUsuario
                   var itemNomU = item.contNombre
                   crearElementosChats(itemIdU, itemNomU);
               });
           })
        }
    }
})

    
    
})

var todos = document.getElementById("todos")
todos.addEventListener("click", function () {
    todos.style.background = "rgba(64, 33,74,.95)";
    todos.style.color = "white";
    fav.style.background="none";
    fav.style.color = "grey"
    archi.style.background = "none";
    archi.style.color = "grey"
$.ajax({
    method: "POST",
    url: "/api/usuarios/autenticacion",
    data:{
         token: token
    }
}).done(function (res) {
    console.log(res)
    if (res.status == 403) {
        window.location.href = "http://localhost:3000";
    } else {
        if (res.status == 200) {
           $.ajax({
               method: "GET",
               url: "http://localhost:3000/inicio/chat/conversaciones/normales/" + idUs
           }).done(function (res) {
               console.log(res)
               var divCon = document.getElementById("contenedores");
               var numDivs = divCon.childElementCount;
               for (var x = 0; x < numDivs; x++) {
                   divCon.removeChild(divCon.lastChild);
               }
               var datos = res.data;
               var ultimoMensaje = "holaaa";
               datos.map(item => {
                   // console.log(item);
                   var itemIdU = item.idUsuario
                   var itemNomU = item.contNombre
                   crearElementosChats(itemIdU, itemNomU);
               });
           })
        }
    }
})

   

})

var archi = document.getElementById("archivados")
archi.addEventListener("click", function () {
    archi.style.background = "rgba(64, 33,74,.95)";
    archi.style.color = "white";
    fav.style.background = "none";
    fav.style.color = "grey"
    todos.style.background = "none";
    todos.style.color = "grey"
$.ajax({
    method: "POST",
    url: "/api/usuarios/autenticacion",
    data:{
        token: token
    }
}).done(function (res) {
    console.log(res)
    if (res.status == 403) {
        window.location.href = "http://localhost:3000";
    } else {
        if (res.status == 200) {
            $.ajax({
                method: "GET",
                url: "http://localhost:3000/inicio/chat/conversaciones/archivadas/" + idUs
            }).done(function (res) {
                console.log(res)
                var divCon = document.getElementById("contenedores");
                var numDivs = divCon.childElementCount;
                for (var x = 0; x < numDivs; x++) {
                    divCon.removeChild(divCon.lastChild);
                }
                var datos = res.data;
                var ultimoMensaje = "holaaa";
                datos.map(item => {
                    // console.log(item);
                    var itemIdU = item.idUsuario
                    var itemNomU = item.contNombre
                    crearElementosChats(itemIdU, itemNomU);
                });
            })

        }
    }
})
    
})

function ArchivarChat(idChat) {

$.ajax({
    method: "POST",
    url: "/api/usuarios/autenticacion",
    data:{
        token: token
    }
}).done(function (res) {
    console.log(res)
    if (res.status == 403) {
        window.location.href = "http://localhost:3000/inicio.html";
    } else {
        if (res.status == 200) {
              $.ajax({
                  method: "PUT",
                  url: "http://localhost:3000/inicio/chat/conversaciones/archivar",
                  data: {
                      idUsuario: idUs,
                      idContacto: idChat
                  }
              }).done(function (res) {
                  console.log(res)
                  var status = res.status;

                  if (status == 1) {
                      Swal({
                          position: 'center',
                          type: 'success',
                          title: 'Chat archivado',
                          showConfirmButton: false,
                          timer: 1500
                      })
                  }

              })
        }
    }
})
  
}
function favoritoChat(idChat) {

    $.ajax({
        method: "POST",
        url: "/api/usuarios/autenticacion",
        data:{
            token: token
        }
    }).done(function (res) {
        console.log(res)
        if (res.status == 403) {
            window.location.href = "http://localhost:3000/inicio.html";
        } else {
            if (res.status == 200) {
                $.ajax({
                    method: "POST",
                    url: "http://localhost:3000/inicio/chat/conversaciones/favoritear",
                    data: {
                        idUsuario: idUs,
                        idContacto: idChat
                    }
                }).done(function (res) {
                    console.log(res)
                    var status = res.status;

                    if (status == 1) {
                        Swal({
                            position: 'center',
                            type: 'success',
                            title: 'Chat archivado',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }

                })
            }
        }
    })
    
}

$.ajax({
    method:"GET",
    url: "http://localhost:3000/api/usuarios/getDatos/"+correoStorage
}).done(function (res){
    console.log(res)
    var datos = res.data
    datos.map(item =>{
        var nombre = item.userNombre
        var correo =item.userCorreo
        var pass = item.userPassword
            var inputNombre = document.getElementById("nombreUs")
            var inputCorreo = document.getElementById("correoUs")
            var password = document.getElementById("contra")

            inputNombre.removeAttribute("placeholder")
            inputNombre.setAttribute("value",nombre)
            inputCorreo.removeAttribute("placeholder")
                password.removeAttribute("value",pass)
                password.removeAttribute("placeholder")
            inputNombre.setAttribute("placeholder",nombre)
            inputCorreo.setAttribute("placeholder",correo)
            inputCorreo.setAttribute("value",correo)
    })
})


document.getElementById("salir").addEventListener("click",function(){

    Swal({
        title: 'Cerrar Sesión',
        text: "¿Deseas cerrar sesión",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si'
    }).then((result) => {
        if (result.value) {
            window.location.href = "http://localhost:3000/inicio.html";
            localStorage.clear();
        }
    })
    

})