const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');
const port = process.env.PORT || 3000;
const publicPath = path.resolve(__dirname + "/public");
const server = http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var router = express.Router();

//RUTA DE TODOS LOS DATOS DE CONTACTO

var db = require('./controllers/db_connection');

router.route('/contactos')
    .get(db.getDataContactos);

router.route('/usuarios')
    .get(db.getDataUsuarios);

router.route('/mensajes')
    .get(db.getDataMensajes);

//RUTAS DE CONTROLADOR DE CONTACTOS
var ctrlContactos = require('./controllers/contactos');

router.route('/contactos/test')
    .get(ctrlContactos.test);;

router.route( '/inicio/contactos/todos/:idUsuario' )
    .get(ctrlContactos.getContactos);

router.route( '/inicio/contactos/agregar' )
    .post(ctrlContactos.addContacto);

router.route( '/inicio/contactos/eliminar' )
    .delete(ctrlContactos.eliminarContacto);

router.route( '/inicio/contactos/bloquear' )
    .put(ctrlContactos.bloquearContacto);

router.route( '/test' )
    .get( ctrlContactos.test );

//RUTAS DEL CONTROLADOR DE CONVERSACIONES
var ctrlConversaciones = require('./controllers/conversacion');

router.route( '/inicio/chat/conversaciones/normales/:idUsuario' )
    .get(ctrlConversaciones.getConversacionesNormales);

router.route( '/inicio/chat/conversaciones/archivadas/:idUsuario' )
    .get(ctrlConversaciones.getConversacionesFavoritas);

router.route( '/inicio/chat/conversaciones/favoritas/:idUsuario' )
    .get(ctrlConversaciones.getConversacionesFavoritas);

router.route( '/inicio/chats/salas/:idUsuario' )
    .get(ctrlConversaciones.getSalas);

router.route( '/inicio/chat/conversaciones/archivar' )
    .put(ctrlConversaciones.archivar);

router.route( '/inicio/chat/conversaciones/eliminar' )
    .delete(ctrlConversaciones.eliminar);

router.route( '/inicio/chat/conversaciones/favoritear' )
    .post(ctrlConversaciones.favoritear);

//RUTAS DEL CONTROLADOR DE MENSAJES
var ctrlMensajes = require('./controllers/mensajes');

router.route( '/inicio/chat/mensajes/todos/:idUsuario/:idContacto' )
    .get(ctrlMensajes.getMensajes);

router.route( '/api/mensajes/nuevo' )
    .post(ctrlMensajes.newMensaje);

router.route( '/api/mensajes/eliminar' )
    .delete(ctrlMensajes.eliminarMensaje);

//RUTAS DEL CONTROLADOR DE USUARIOS
var ctrlUsuarios = require( './controllers/usuarios' );

router.route( '/api/usuarios/registro' )
    .post(ctrlUsuarios.registro);
router.route( '/api/usuarios/login' )
    .post(ctrlUsuarios.login);
router.route( '/api/usuarios/getDatos/:correo' )
    .get(ctrlUsuarios.getDatos);

//ARCHIVO DE CONTROL DE SOCKETS
module.exports.io = socketIO(server);
require('./server/socket/socket.js');

//DECLARACION DEL USO DE LAS RUTAS DEL ROUTER.
app.use(express.static(publicPath), router);

server.listen(port, ()=>{
    console.log(`listening on port: ${port}`);
});