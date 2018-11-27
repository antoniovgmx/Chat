alert('Bienvenido');

document.getElementById('btnRegistro').addEventListener('click', ()=>{
    var nombre = document.getElementById('nombre');
    var usuario = document.getElementById('usuario');
    var pass = document.getElementById('password');

    var data = {
        nombre,
        usuario,
        pass 
    }

    fetch('/api/usuario/registro', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then((response)=>{
        return response.json();
      }).then((datos)=>{
        
        if(datos.status) { 
          window.location.href = "/";
        }
      });
});