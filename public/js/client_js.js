var socket = io();



socket.on('connect', ()=>{
    console.log('Conectado al servidor');

    //CONSULTA PARA CONSEGUIR LAS SALAS  |
    //                                   V
    socket.emit('suscribirse', 'DATOS DE LAS SALAS', (res)=>{
        console.log(res.msg);
    });
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
    //AGREGAR MENSAJE
    console.log('Respuesta : ', resp);
});

socket.on('enviarMensaje', (mensaje)=>{
    console.log('Servidor: ', mensaje);
});