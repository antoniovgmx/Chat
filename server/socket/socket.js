const { io } = require('../../app.js');

io.on('connection', (client)=>{

    //una vez conectado a la página y cargadas sus conversaciones
    //suscribir al cliente a los sockets de sus chats
    client.on('suscribirse', (salas)=>{

        salas.forEach(sala => {
            client.join(sala);
        });

    });

    client.on('enviarMensaje', ( data )=>{

        //DEBO LLAMAR A MI API USANDO AXIOS PARA GUARDAR EL MENSAJE

        client.broadcast.to(data.sala).emit('mensajeNuevo', {
            usuario : data.usuario,
            mensaje : data.mensaje
        });
        
    });

    client.on('eliminarMensaje', ( data )=>{
        client.broadcast.to(data.sala).emit('mensajeEliminado', {
            idMensaje : data.idMensaje,
            
        });
    });



    

});
