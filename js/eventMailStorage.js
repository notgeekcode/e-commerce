let listaPrevia1 = JSON.parse(localStorage.getItem("userEmail")??"[]"); 
//obtengo los datos del mail a traves del localstorage y con el JSON.parse lo transforme en String

document.getElementById("nav-item-id").innerHTML = `
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    ${listaPrevia1}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi perfil </a></li>
    <li><a class="dropdown-item" href="index.html">Cerrar sesión</a></li>
  </ul>
</div>`; 
//ingreso a las clases="profileUsers" y alli pongo un hipervinculo con los datos del localStorage, y este 
//hipervinculo lleva hacia my-profile.html


