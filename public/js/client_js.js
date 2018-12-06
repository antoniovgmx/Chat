var socket = io();

socket.on('connect', ()=>{
    console.log('Conectado al servidor');
});

    socket.on('disconnect', ()=>{
        console.log('Perdimos conexión');
    });
    
    socket.emit('enviarMensaje', {
        usuario : 'Tony',
        mensaje : 'Hola'
    }, (resp)=>{
        console.log('Respuesta : ', resp);
    });

    socket.on('enviarMensaje', (mensaje)=>{
        console.log('Servidor: ', mensaje);
    });