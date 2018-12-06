

//////////////CONTACTOS/////////////////////////////////////////////////
var correo ="aixa@gmail.com";
var idUs = 2
$.ajax({
    method: "GET",
    url: "http://localhost:3000/inicio/chat/conversaciones/" + idUs
}).done(function(res){
    var datos= res.data;
    datos.map(item => {
        console.log(item);
        //////////////////////CREACION DE ELEMENTOS///////////////////////////////////////////////
         var contenedores = document.getElementById("contenedoresCon");
         var contenedor = document.createElement("DIV");
         contenedor.classList.add("contenedor");
         contenedor.setAttribute("id", "cont" + item.idContacto + "");
         var imgCon = document.createElement("DIV")
         imgCon.classList.add("imgUsuario");
         var lado = document.createElement("DIV");
         lado.classList.add("lado");
         var puntitos = document.createElement("DIV")
                puntitos.classList.add("mas")
                puntitos.classList.add("masCon");
                puntitos.setAttribute("id","mas2");
                puntitos.setAttribute('data-menu','menuConv');
                    var iconPun = document.createElement("I");
                    iconPun.classList.add("fas")
                    iconPun.classList.add("fa-ellipsis-v");
                    var cuadrito = document.createElement("DIV")
                    cuadrito.classList.add("cuadrito")
                    cuadrito.classList.add("cuadritoChats")
                        var pEliminar = document.createElement("P")
                        pEliminar.classList.add("eliminarChat");
                        pEliminar.setAttribute("id","eliminarChat");
                        var textEli = document.createTextNode("Eliminar")
                            pEliminar.appendChild(textEli);
                        var pArchivar = document.createElement("P")
                        pArchivar.classList.add("archivarChat");
                        pArchivar.setAttribute("id","archivarChat");
                        var textArc = document.createTextNode("Archivar")
                            pArchivar.appendChild(textArc);
                        var pFavorito = document.createElement("P")
                        pFavorito.classList.add("favoritoChat");
                        pFavorito.setAttribute("id","favoritoChat");
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
          divtText.setAttribute("onclick", "conversacionNueva(" + item.idContacto + ")");
        var nombreCon = document.createElement("H3");
        var nombre= document.createTextNode(item.contNombre);
        nombreCon.appendChild(nombre);
        divtText.appendChild(nombreCon);

        contenedor.appendChild(imgCon);
        contenedor.appendChild(divtText);
        contenedor.appendChild(lado);
        contenedores.appendChild(contenedor);
        
    });
});

$.ajax({
    method: "GET",
    url: "http://localhost:3000/inicio/chat/conversaciones/"+idUs
}).done(function(res){
    var datos = res.data;
    var ultimoMensaje="holaaa";
    datos.map(item => {
        console.log(item);
         var contenedores = document.getElementById("contenedores");
         var contenedor = document.createElement("DIV");
         contenedor.classList.add("contenedor");
         contenedor.setAttribute("id","cont");
         contenedor.setAttribute("onclick","chat("+item.idUsuario+")");
                var divImgUs = document.createElement("DIV");
                divImgUs.classList.add("imgUsuario");
                var divTexto = document.createElement("DIV");
                divTexto.classList.add("texto");
                divTexto.setAttribute("div","texto");
                    var nombreChat = document.createElement("H3");
                    var nombre2 = document.createTextNode(item.userNombre);
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
        divMas.setAttribute("div","mas");
            var iconMas = document.createElement("I")
            iconMas.classList.add("fas")
            iconMas.classList.add("fa-ellipsis-v")
            var divCuadrito = document.createElement("DIV");
            divCuadrito.classList.add("cuadrito")
            divCuadrito.classList.add("cuadroChat")
            divCuadrito.setAttribute("id","cuadroChats");
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
    var divH = document.getElementById("mensajes").scrollHeight;
    document.getElementById("mensajes").scrollTop = divH;


    // console.log("scroll"+divH);

});
