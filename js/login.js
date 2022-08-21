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