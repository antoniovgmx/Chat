//////////////CONTACTOS/////////////////////////////////////////////////
var correo = "aixa@gmail.com";
var idUs = 2

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
    cuadrito.classList.add("cuadritoChats")
    var pEliminar = document.createElement("P")
    pEliminar.classList.add("eliminarChat");
    pEliminar.setAttribute("id", "eliminarChat");
    var textEli = document.createTextNode("Eliminar")
    pEliminar.appendChild(textEli);
    var pArchivar = document.createElement("P")
    pArchivar.classList.add("archivarChat");
    pArchivar.setAttribute("id", "archivarChat");
    var textArc = document.createTextNode("Archivar")
    pArchivar.appendChild(textArc);
    var pFavorito = document.createElement("P")
    pFavorito.classList.add("favoritoChat");
    pFavorito.setAttribute("id", "favoritoChat");
    var textFav = document.createTextNode("Favorito")
    pFavorito.appendChild(textFav);

    cuadrito.appendChild(pEliminar);
    cuadrito.appendChild(pArchivar);
    cuadrito.appendChild(pFavorito);
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
        method: "GET",
        url: "http://localhost:3000/inicio/contactos/todos/" + idUs
    }).done(function (res) {
        var datos = res.data;
        datos.map(item => {
            console.log(item);

            var itemNombre = item.contNombre
            var itemId = item.idContacto

            crearElementosContactos(itemId, itemNombre);
        });
    });
}


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
    divCuadrito.classList.add("cuadroChat")
    divCuadrito.setAttribute("id", "cuadroChats");
    var pEliminar = document.createElement("P")
    pEliminar.classList.add("eliminarChat");
    pEliminar.setAttribute("id", "eliminarChat");
    var textEli = document.createTextNode("Eliminar")
    pEliminar.appendChild(textEli);
    var pArchivar = document.createElement("P")
    pArchivar.classList.add("archivarChat");
    pArchivar.setAttribute("id", "archivarChat");
    var textArc = document.createTextNode("Archivar")
    pArchivar.appendChild(textArc);
    var pFavorito = document.createElement("P")
    pFavorito.classList.add("favoritoChat");
    pFavorito.setAttribute("id", "favoritoChat");
    var textFav = document.createTextNode("Favorito")
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
///////////////////AJAX OBTENER CONVERSACIONES////////////////
$.ajax({
    method: "GET",
    url: "http://localhost:3000/inicio/chat/conversaciones/" + idUs
}).done(function (res) {
    var datos = res.data;
    var ultimoMensaje = "holaaa";
    datos.map(item => {
        // console.log(item);
        var itemIdU = item.idUsuario
        var itemNomU = item.userNombre
        crearElementosChats(itemIdU, itemNomU);
    });
});

/////////// CREACION DE CUADORS DE EMENSAJES ////////////////////////
var time = "12:30";
var buttonEnviar = document.getElementById('enviar');
buttonEnviar.addEventListener("click", function () {
    var mensaje = document.getElementById("mensajeT").value
    var enviado = document.createElement("DIV");
    enviado.classList.add("recibido");
    var divMsg = document.createElement("div");
    divMsg.classList.add("mensajeR");
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
});

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
var botnAgregar = document.getElementById("agregarContacto");
botnAgregar.addEventListener("click", function(){
   var correoCon = document.getElementById("correoCon").value
   var nombreCon = document.getElementById("nombreCon").value
    console.log(idUs);
   console.log(correoCon);
   console.log(nombreCon);

    ajax(nombreCon,correoCon)
})

function ajax(nombreCon,correoCon){
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
               var numDivs= divCon.childElementCount;
                console.log(numDivs);
                    for(var x=1;x<numDivs;x++){
                        divCon.removeChild(divCon.lastChild);
                    }
                     obtenerContactos();
        })
}

