const axios = require('axios');
const { io } = require('../../app.js');

io.on('connection', (client)=>{

    //una vez conectado a la página y cargadas sus conversaciones
    //suscribir al cliente a los sockets de sus chats
    client.on('suscribirse', (salas)=>{

        salas.forEach(sala => {
            client.join(sala);
        });

    });

    client.on('enviarMensaje', ( data, callback )=>{

        //DEBO LLAMAR A MI API USANDO AXIOS PARA GUARDAR EL MENSAJE

        axios({
            method: 'post',
            url: '/api/mensajes/nuevo',
            data: {
              idUsuario : data.idUsuario,
              idContacto : data.idContacto,
              mensaje : data.mensaje
            }
          }).then((response)=>{
            if( response.status == 1 ){
                client.broadcast.to(data.sala).emit('mensajeNuevo', {
                    usuario : data.usuario,
                    mensaje : data.mensaje
                });
                callback({ status : 1 });
            } else {
                callback({
                    status : 0,
                    msg : 'Ocurrió un error al enviar el mensaje'
                });
            }
          });

       
        
    });

    client.on('eliminarMensaje', ( data )=>{

        axios({
            method: 'post',
            url: '/api/mensajes/eliminar',
            data: {
              idMensaje : data.idMensaje
            }
          }).then((response)=>{
            if( response.status == 1 ){
                client.broadcast.to(data.sala).emit('mensajeEliminado', {
                    idMensaje : data.idMensaje
                });
                callback({ status : 1 });
            } else {
                callback({
                    status : 0,
                    msg : 'Ocurrió un error al enviar el mensaje'
                });
            }
          });

    });



    

});
