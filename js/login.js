function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

let campoMail = document.getElementById("email");
let campoPass = document.getElementById("password1");

document.getElementById("regBtn").addEventListener("click", function() {
    
    if(campoMail.value == "" || campoPass.value == "") {
        showAlertError();
    } else {
        showAlertSuccess();
        window.location.href = "homepage.html";
    }
})