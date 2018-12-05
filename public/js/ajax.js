


var correo ="aixa@gmail.com";
$.ajax({
    method: "GET",
    url: "http://localhost:3000/api/usuarios/getDatos/"+correo
}).done(function(res){
    // console.log(res);
    var datos= res.data;
    // console.log(datos);

    datos.map(item => {
        console.log(item);
        // var h = document.createElement("h1")
        // var text = document.createTextNode(datos2.userCorreo);
        // h.appendChild(text);
        // var doc = document.getElementById("CHATS")
        // doc.appendChild(h);
    });

    // for (let d = 0; d < datos.length; d++) {
    // //    console.log(datos[0]);
    //     var datos2 = datos[0];
    //    console.log(datos2.idUsuario, datos2.userCorreo);

       

    // }
});