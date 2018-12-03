
 var wid = document.body.clientWidth
 console.log(wid);

 window.addEventListener("resize",function () {
    wid = document.body.clientWidth;
      console.log(wid);
        document.getElementById('abajo').style.display = "block";
      var co = document.getElementById("CONVER")
      if ((co.style.display ="block") && (wid < 768)) {
          document.getElementById('abajo').style.display = "none";
      }else{
          document.getElementById('abajo').style.display = "block";
      }
 });

function chats(){
    if(wid<768){
        document.getElementById("chat").style.color = "coral"
        document.getElementById("perfil").style.color = "white";
        document.getElementById("conver").style.color = "white";


        document.getElementById("CHATS").style.display = "block";
        document.getElementById("CONTACTOS").style.display = "none";
        document.getElementById("PERFIL").style.display = "none";
    }else{
       document.getElementById("chat").style.color = "coral"
       document.getElementById("perfil").style.color = "gainsboro";
       document.getElementById("conver").style.color = "gainsboro";

       document.getElementById("CONVER").style.display="block"
       document.getElementById("CHATS").style.display = "block";
       document.getElementById("CONTACTOS").style.display = "none";
       document.getElementById("PERFIL").style.display = "none";
    }
        
}

function contac(){
    if(wid<768){
        document.getElementById("conver").style.color = "coral"
        document.getElementById("perfil").style.color = "white";
        document.getElementById("chat").style.color = "white";

        document.getElementById("CONTACTOS").style.display = "block";
        document.getElementById("CHATS").style.display = "none";
        document.getElementById("PERFIL").style.display = "none";
    }else{
        // alert("nooo");
         document.getElementById("conver").style.color = "coral"
         document.getElementById("perfil").style.color = "gainsboro";
         document.getElementById("chat").style.color = "gainsboro";

         document.getElementById("CONVER").style.display = "block"
         document.getElementById("CONTACTOS").style.display = "block";
         document.getElementById("CHATS").style.display = "none"
         document.getElementById("PERFIL").style.display = "none";
    }
     
}

function per(){
    if(wid<768){        
         document.getElementById("perfil").style.color = "coral"
         document.getElementById("chat").style.color = "white";
         document.getElementById("conver").style.color = "white";

         document.getElementById("PERFIL").style.display = "block";
         document.getElementById("CHATS").style.display = "none";
         document.getElementById("CONTACTOS").style.display = "none";
         }else{
              document.getElementById("perfil").style.color = "coral"
              document.getElementById("chat").style.color = "white";
              document.getElementById("conver").style.color = "white";

              document.getElementById("CONVER").style.display = "block"
              document.getElementById("PERFIL").style.display = "block";
              document.getElementById("CHATS").style.display = "none";
              document.getElementById("CONTACTOS").style.display = "none";
  
         }
    }
        
function contenedor(){
        if(wid<768){
            document.getElementById('CONVER').style.display = "block";
            document.getElementById('abajo').style.display = "none";
        }else{
            document.getElementById("CONVER").style.display = "block"
        }
       
}

function back(){
    if (wid < 768) {
        document.getElementById('abajo').style.display = "block";

        document.getElementById("chat").style.color = "coral"
        document.getElementById("perfil").style.color = "white";
        document.getElementById("conver").style.color = "white";


        document.getElementById("CHATS").style.display = "block";
        document.getElementById("CONTACTOS").style.display = "none";
        document.getElementById("PERFIL").style.display = "none";
        document.getElementById("CONVER").style.display="none";
    } else {
        alert("nooo");
    }
}
function close(){
    document.getElementById("nuevoCon").style.display="none";
}
function nuevo(){
    document.getElementById("nuevoCon").style.display = "block";
}
function more(){
    document.getElementById("cuadroChats").style.display="block";
}
function more2(){
    document.getElementById("cuadroChats").style.display = "none";
}

            var tex = document.getElementById("texto");
            var chat = document.getElementById('iconChat');
            var contactos = document.getElementById('iconContactos');
            var perfil = document.getElementById('iconPerfil');
            var atras = document.getElementById('atras');
            var cerrar = document.getElementById("cerrar");
            var agregar = document.getElementById("agregarCon");
            var mas = document.getElementById("mas")

            tex.addEventListener("click", function () {
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
            cerrar.addEventListener("click",function(){
                close();
            })
            agregar.addEventListener("click",function(){
                nuevo();
            })
            mas.addEventListener("click",function(){
                more();
            })
            mas.addEventListener("dblclick",function(){
                more2();
            })

            ///////////////////////MENSAJES///////////////////////////

window.addEventListener("resize", function(){

})
          

