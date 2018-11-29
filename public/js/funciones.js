
 var wid = document.body.clientWidth
 console.log(wid);

 window.addEventListener("resize",function () {
    wid = document.body.clientWidth;
      console.log(wid);
 });

function chats(){
    if(wid<768){
        document.getElementById("chat").style.color = "brown"
        document.getElementById("perfil").style.color = "gray";
        document.getElementById("conver").style.color = "gray";


        document.getElementById("CHATS").style.display = "block";
        document.getElementById("CONTACTOS").style.display = "none";
        document.getElementById("PERFIL").style.display = "none";
    }else{
        alert("nooo");
    }
        
}

function contac(){
    if(wid<768){
        document.getElementById("conver").style.color = "brown"
        document.getElementById("perfil").style.color = "gray";
        document.getElementById("chat").style.color = "gray";

        document.getElementById("CONTACTOS").style.display = "block";
        document.getElementById("CHATS").style.display = "none";
        document.getElementById("PERFIL").style.display = "none";
    }else{
        alert("nooo");
    }
     
}

function per(){
    if(wid<768){        
         document.getElementById("perfil").style.color = "brown"
         document.getElementById("chat").style.color = "gray";
         document.getElementById("conver").style.color = "gray";

         document.getElementById("PERFIL").style.display = "block";
         document.getElementById("CHATS").style.display = "none";
         document.getElementById("CONTACTOS").style.display = "none";
         }else{
             alert("noooo");
         }
    }
        
function contenedor(){
        if(wid<768){
            document.getElementById('CONVER').style.display = "block";
            document.getElementById('abajo').style.display = "none";
        }else{

        }
       
}
function back(){
    if (wid < 768) {
        document.getElementById('abajo').style.display = "block";

        document.getElementById("chat").style.color = "brown"
        document.getElementById("perfil").style.color = "gray";
        document.getElementById("conver").style.color = "gray";


        document.getElementById("CHATS").style.display = "block";
        document.getElementById("CONTACTOS").style.display = "none";
        document.getElementById("PERFIL").style.display = "none";
        document.getElementById("CONVER").style.display="none";
    } else {
        alert("nooo");
    }
}

            var cont = document.getElementById("cont");
            var chat = document.getElementById('iconChat');
            var contactos = document.getElementById('iconContactos');
            var perfil = document.getElementById('iconPerfil');
            var atras = document.getElementById('atras');

            cont.addEventListener("click", function () {
               contenedor();
            });

            chat.addEventListener("click", function () {
                chats();
            })

            contactos.addEventListener("click", function () {
               contac();
            })

            perfil.addEventListener("click", function () {
               per();
            })

            atras.addEventListener("click",function(){
                back();
            })


            ///////////////////////MENSAJES///////////////////////////


            var buttonEnviar = document.getElementById('enviar');
             buttonEnviar.addEventListener("click", function(){

             });

