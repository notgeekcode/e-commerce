//tuve que creear un nuevo archivo js porque si vinculaba en un archivo js a dos html por alguna razon no se ejecutaba de forma correcta
let listaPrevia1 = JSON.parse(localStorage.getItem("userEmail")??"[]"); //obtengo los datos del mail a traves del localstorage y con el JSON.parse lo transforme en String
document.getElementById("nav-item-id").innerHTML = `<a class = "nav-link" href="my-profile.html"> ${listaPrevia1} </a>`; //ingreso a las clases="profileUsers" y alli pongo un hipervinculo con los datos del localStorage, y este hipervinculo lleva hacia my-profile.html