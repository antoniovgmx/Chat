


var correo ="aixa@gmail.com";
var idUs = 2
$.ajax({
    method: "GET",
    url: "http://localhost:3000/inicio/chat/conversaciones/" + idUs
}).done(function(res){
    var datos= res.data;

    datos.map(item => {
        console.log(item);
         var contenedores = document.getElementById("contenedoresCon");
         var contenedor = document.createElement("DIV");
         contenedor.classList.add("contenedor");
         contenedor.setAttribute("id", "cont" + item.idContacto + "");
         contenedor.setAttribute("onclick", "conversacionNueva(" + item.idContacto + ")");
         var imgCon = document.createElement("DIV")
         imgCon.classList.add("imgUsuario");
         var lado = document.createElement("DIV");
         lado.classList.add("lado");
         var puntitos = document.createElement("DIV")
                puntitos.classList.add("mas")
                puntitos.classList.add("masCon");
                puntitos.setAttribute("id","mas2");
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
        var nombreCon = document.createElement("H3");
        var nombre= document.createTextNode(item.contNombre);
        nombreCon.appendChild(nombre);
        divtText.appendChild(nombreCon);

        contenedor.appendChild(imgCon);
        contenedor.appendChild(divtText);
        contenedor.appendChild(lado);
        contenedores.appendChild(contenedor);
        
    });

    // for (let d = 0; d < datos.length; d++) {
    // //    console.log(datos[0]);
    //     var datos2 = datos[0];
    //    console.log(datos2.idUsuario, datos2.userCorreo);

       

    // }
});