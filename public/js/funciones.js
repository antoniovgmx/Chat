
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
        document.getElementById("perfil").style.color = "gray";
        document.getElementById("conver").style.color = "gray";


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
        document.getElementById("perfil").style.color = "gray";
        document.getElementById("chat").style.color = "gray";

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
         document.getElementById("chat").style.color = "gray";
         document.getElementById("conver").style.color = "gray";

         document.getElementById("PERFIL").style.display = "block";
         document.getElementById("CHATS").style.display = "none";
         document.getElementById("CONTACTOS").style.display = "none";
         }else{
              document.getElementById("perfil").style.color = "coral"
              document.getElementById("chat").style.color = "gainsboro";
              document.getElementById("conver").style.color = "gainsboro";

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
            cerrar.addEventListener("click",function(){;
                   document.getElementById("nuevoCon").style.display = "none";
            })
            agregar.addEventListener("click",function(){
                document.getElementById("nuevoCon").style.display = "block";
            })
            mas.addEventListener("click",function(){;
                document.getElementById("cuadroChats").style.display = "block";
                document.getElementById("cuadroConta").style.display = "block";
            })
            mas.addEventListener("dblclick",function(){
                document.getElementById("cuadroChats").style.display = "none";
                document.getElementById("cuadroConta").style.display = "none";
            })
            // mas2.addEventListener("click", function () {
            //     document.getElementById("cuadroConta").style.display = "block";
            // })
            // mas2.addEventListener("dblclick", function () {
            //     document.getElementById("cuadroConta").style.display = "none";
            // })
            ///////////////////////MENSAJES///////////////////////////
           $(document).on("click", "div.lado", function(){
                console.log(this);
               var cuadrito = $(this).find(".cuadrito.cuadritoChats").get(0);
               cuadrito.style.display="block";
           });
           $(document).on("click")

