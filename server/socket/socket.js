const axios = require('axios');
const { io } = require('../../app.js');

io.on('connection', (client)=>{

    //una vez conectado a la página y cargadas sus conversaciones
    //suscribir al cliente a los sockets de sus chats
    client.on('suscribirse', ( salas , callback )=>{

        for(var sala in salas) {
            client.join(sala);
        }

        callback({ msg : 'Conectado exitosamente' });

    });

    client.on('enviarMensaje', ( data, callback )=>{
        axios.post('/api/mensajes/nuevo', {
            idUsuario : data.idUsuario,
            idContacto : data.idContacto,
            mensaje : data.mensaje
          })
          .then(function (response) {
            client.broadcast.to(data.sala).emit('mensajeNuevo', {
                usuario : data.usuario,
                mensaje : data.mensaje
            });
            callback({ status : 1, mensaje : data.mensaje });
          })
          .catch(function (error) {
            callback({ status : 0, mensaje : 'Ocurrió un error al enviar el mensaje', error });
          });
    });

    client.on('eliminarMensaje', ( data )=>{

        axios.post('/api/mensajes/eliminar', {
            idMensaje : data.idMensaje
          })
          .then(function (response) {
            client.broadcast.to(data.sala).emit('mensajeEliminado', {
                idMensaje : data.idMensaje
            });
            callback({ status : 1, idMensaje : data.idMensaje });
          })
          .catch(function (error) {
            callback({ status : 0, mensaje : 'Ocurrió un error al eliminar el mensaje', error });
          });

    });

});
