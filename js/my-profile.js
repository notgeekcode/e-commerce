/* document.getElementById("regBtn").addEventListener("click", function() { //evento que se ejecuta cuando el usuario hace click en el boton de ingresar en el login
    let mailUsuario = document.getElementById("email").value; //obtengo lo que escribio el usuario en el input de mail
    localStorage.setItem("userEmail", JSON.stringify(mailUsuario)); //seteo en el localstorage una key de nombre userEmail y va a recbir como valores lo que el usuario haya puesto en el campo de mail y ademas con el JSON.stringify convierto el valor de js en una cadena de texto con notacion JSON.
}); */


let userMail = localStorage.getItem("userEmail"); //obtenemos a traves del key userMail del LocalStorage el valor mail que ingreso el usuario en el login
let userMailClean = userMail.substring(1, (userMail.length - 1)); //con el metodo substring quitamos las comillas que nos trae el valor del LocalStorage
document.getElementById("mail").value = userMailClean; //actualizamos el valor del input de mail con el mail del LocalStorage