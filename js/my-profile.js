let setFormularioObj = {};
let getFormularioObj ={};

let userMail = localStorage.getItem("userEmail"); //obtenemos a traves del key userMail del LocalStorage el valor mail que ingreso el usuario en el login
let userMailClean = userMail.substring(1, (userMail.length - 1)); //con el metodo substring quitamos las comillas que nos trae el valor del LocalStorage
document.getElementById("mail").value = userMailClean; //actualizamos el valor del input de mail con el mail del LocalStorage

document.getElementById("btnGuardar").addEventListener("click", function() {

    setFormularioObj = {
        'nombre': document.getElementById("primerNombre").value, 
        'apellido': document.getElementById("primerapellido").value, 
        'mail': document.getElementById("mail").value
    };

    // Poner el objeto en el LocalStorage
    localStorage.setItem('formularioObj', JSON.stringify(setFormularioObj));
    
});

document.addEventListener("DOMContentLoaded", function() {

    //Traer el objeto del LocalStorage
    getFormularioObj = JSON.parse(localStorage.getItem('formularioObj'));

    //Modificar el valor de los input con los valores del LocalStorage.
    document.getElementById("primerNombre").value = getFormularioObj.nombre;
    document.getElementById("primerApellido").value = getFormularioObj.apellido;
})

//validar formulario
var registro = document.getElementById("registro");

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