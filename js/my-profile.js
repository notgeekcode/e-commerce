let setFormularioObj = {};
let getFormularioObj = {};
let registro = document.getElementById("registro");

let userMail = localStorage.getItem("userEmail"); //obtenemos a traves del key userMail del LocalStorage el valor mail que ingreso el usuario en el login
let userMailClean = userMail.substring(1, (userMail.length - 1)); //con el metodo substring quitamos las comillas que nos trae el valor del LocalStorage
document.getElementById("mail").value = userMailClean; //actualizamos el valor del input de mail con el mail del LocalStorage

// Poner el objeto en el LocalStorage (tipo de dato como string)
document.getElementById("btnGuardar").addEventListener("click", function() {

    setFormularioObj = {
        'nombre': document.getElementById("primerNombre").value, 
        'apellido': document.getElementById("primerApellido").value, 
        'mail': document.getElementById("mail").value
    };
    
    localStorage.setItem('formularioObj', JSON.stringify(setFormularioObj)); 
});

//Traer el objeto del LocalStorage
document.addEventListener("DOMContentLoaded", function() {
    
    getFormularioObj = JSON.parse(localStorage.getItem('formularioObj'));
    document.getElementById("primerNombre").value = getFormularioObj.nombre;
    document.getElementById("primerApellido").value = getFormularioObj.apellido;
})

//validacion del formulario.      
registro.addEventListener('submit', function (event) {
    
    if (!registro.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    }else {
        validarFormulario();
    }
    registro.classList.add('was-validated')
})

function validarFormulario() {
    if(registro.checkValidity) {
        showAlertSuccess();
    }
}