let setFormularioObj = {};
let registro = document.getElementById("registro");

let userMail = localStorage.getItem("userEmail"); //obtenemos a traves del key userMail del LocalStorage el valor mail que ingreso el usuario en el login
let userMailClean = userMail.substring(1, (userMail.length - 1)); //con el metodo substring quitamos las comillas que nos trae el valor del LocalStorage
document.getElementById("mail").value = userMailClean; //actualizamos el valor del input de mail con el mail del LocalStorage

// Poner el objeto en el LocalStorage (tipo de dato como string)
document.getElementById("btnGuardar").addEventListener("click", function() {

    setFormularioObj = {
        'nombre': document.getElementById("primerNombre").value, 
        'apellido': document.getElementById("primerApellido").value, 
        'mail': document.getElementById("mail").value,
        'segundoNombre' : document.getElementById("segundoNombre").value,
        'segundoApellido' : document.getElementById("segundoapellido").value,
        'telContacto' : document.getElementById("TelContacto").value
    };
    
    localStorage.setItem(document.getElementById("mail").value, JSON.stringify(setFormularioObj)); //guardamos con el mail como key y en forma de string el objeto en el ls... como el key va ser diferente en cada mail se va a crear un objeto diferente en el ls 
});

//Traer el objeto del LocalStorage
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("mail").setAttribute("disabled","");
    //el valor de los input seran iguales a los atributos del objeto de cada usuario segun cada mail.
    document.getElementById("primerNombre").value = JSON.parse(localStorage.getItem(document.getElementById("mail").value)).nombre;
    document.getElementById("primerApellido").value = JSON.parse(localStorage.getItem(document.getElementById("mail").value)).apellido;
    document.getElementById("segundoNombre").value = JSON.parse(localStorage.getItem(document.getElementById("mail").value)).segundoNombre;
    document.getElementById("segundoapellido").value = JSON.parse(localStorage.getItem(document.getElementById("mail").value)).segundoApellido;
    document.getElementById("TelContacto").value = JSON.parse(localStorage.getItem(document.getElementById("mail").value)).telContacto;
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

function showAlertSuccess() {
    document.getElementById("alert-successCompra").classList.add("show");
} 