function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

let campoMail = document.getElementById("email");
let campoPass = document.getElementById("password1");

document.getElementById("regBtn").addEventListener("click", function() {
    
    if(campoMail.value == "" || campoPass.value == "") {
        alert("Ingrese los datos nuevamente");
        
    } else {
        showAlertSuccess();
        window.location.href = "index.html";
    }
})

//cuando el usuario este en login.html el localStorage va a limpiarse siempre.
document.addEventListener("DOMContentLoaded", function() {
    
})

document.getElementById("regBtn").addEventListener("click", function() { //evento que se ejecuta cuando el usuario hace click en el boton de ingresar en el login
    let mailUsuario = document.getElementById("email").value; //obtengo lo que escribio el usuario en el input de mail
    localStorage.setItem("userEmail", JSON.stringify(mailUsuario)); //seteo en el localstorage una key de nombre userEmail y va a recbir como valores lo que el usuario haya puesto en el campo de mail y ademas con el JSON.stringify convierto el valor de js en una cadena de texto con notacion JSON.
});