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
        window.location.href = "homepage.html";
    }
})

//cuando el usuario este en index.html el localStorage va a limpiarse siempre.
document.addEventListener("DOMContentLoaded", function() {
    localStorage.clear();
})