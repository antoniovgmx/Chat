const express = require('express');
const app = express();
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');
const port = process.env.PORT || 3000;
const publicPath = path.resolve(__dirname + "/public");
const server = http.createServer(app);

var router = express.Router();

//RUTAS DE CONTROLADOR DE CONTACTOS
var ctrlContactos = require('./controllers/contactos');

router.route( '/inicio/contactos/todos/:idUsuario' )
    .get(ctrlContactos.getContactos);

router.route( '/inicio/contactos/agregar' )
    .post(ctrlContactos.addContacto);

router.route( '/test' )
    .get( ctrlContactos.test );

//RUTAS DEL CONTROLADOR DE CONVERSACIONES
var ctrlConversaciones = require('./controllers/conversacion');

router.route( '/inicio/chat/conversaciones/:idUsuario' )
    .get(ctrlConversaciones.getConversaciones);

//RUTAS DEL CONTROLADOR DE MENSAJES
var ctrlMensajes = require('./controllers/mensajes');

router.route( '/inicio/chat/mensajes/todos/:idUsuario/:idDestinatario' )
    .get(ctrlMensajes.getMensajes);

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