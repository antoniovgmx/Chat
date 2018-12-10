var socket = io();

socket.on('connect', ()=>{
    console.log('Conectado al servidor');

    //     $.ajax({
    //         method: "GET",
    //         url: "/inicio/chats/salas/" + idUs
    //     }).done(function(res){
    //         console.log(res);
    //     })


    // //CONSULTA PARA CONSEGUIR LAS SALAS  |
    // //                                   V
    // socket.emit('suscribirse', 'DATOS DE LAS SALAS', (res)=>{
    //     console.log(res.msg);
    // });
});

socket.on('disconnect', ()=>{
    console.log('Ha ocurrido un error en la conexión, usuario desconectado temporalmente.');
});


//ADD EVENT LISTENER DE 'CLICK' DE BOTÓN DE ENVIAR
socket.emit('enviarMensaje', {
    sala : 'VARIABLE DE LA SALA DE CHAT',
    usuario : 'NOMBRE DEL USUARIO',
    mensaje : 'VARIABLE QUE CONTIENE EL MENSAJE ESCRITO'
}, (resp)=>{

    if(resp.status == 0){
        console.log('Ocurrió un error');
    } else {
        console.log('Tú:', resp.mensaje);
    }
});

socket.on('mensajeNuevo', (data)=>{
    //LOGICA PARA DESPLEGAR EL MENSAJE
    console.log(`${data.usuario} : ${data.mensaje}`);
});