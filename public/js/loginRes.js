var pass = document.getElementById("logPassword");
var usua = document.getElementById("logUser");

function login() {
    $.ajax({
        method: "POST",
        url: "/api/usuarios/login",
        data: {
            "correo": "" + usua + "",
            "password": "" + pass + ""
        }
    }).done(function (res) {
        console.log(res);
    })
}