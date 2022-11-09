const date = new Date();
let textArea = document.getElementById("textArea");
let select = document.getElementById("select");
let userEmailLocalStorage = localStorage.getItem("userEmail");
let userEmail = userEmailLocalStorage.substring(1, (userEmailLocalStorage.length - 1));

let currentCategoriesArray = []; //asignamos un array vacio.
let getDatos = JSON.parse(localStorage.getItem("catID1") ?? []); //seteo con diferente key //
JSON.stringify(getDatos);
let setCat = `https://japceibal.github.io/emercado-api/products/${getDatos}.json`;

//se le asigna a setComents la url del JSON consultado. En este caso los comentarios de los productos
let setComments = `https://japceibal.github.io/emercado-api/products_comments/${getDatos}.json`
let currentComments = [];


//funcion que dibuja en pantalla diferentes atributos del array currentCategoriesArray.
function showCategoriesList() {
    let htmlContentToAppend = "";
    htmlContentToAppend = `
    <div class="container">
        <h1 class="text-center"><br>
            ${currentCategoriesArray.name}
            <br><br><hr>
        </h1>
        <button id="btnComprar" class="btn btn-success position-absolute top-25 start-25 moveLeft" type="submit">Comprar</button>
    </div>
    <div>
        <p><strong>Precio</strong><br>  ${currentCategoriesArray.currency} ${currentCategoriesArray.cost}</p>
    </div>
    <div>
        <p><strong>Descripción</strong><br> ${currentCategoriesArray.description}</p>
    </div>
    <div>
        <p><strong>Categoría</strong><br> ${currentCategoriesArray.category}</p>
    </div>
    <div>
        <p><strong>Cantidad de vendidos</strong><br> ${currentCategoriesArray.soldCount}</p>
    </div>
    <div>
        <p class="text-center h3"><strong>Imágenes ilustrativas</strong></p><br>
    </div>
    <br>
    <div id="contenedor-carousel"></div>
    <br>
    <div id="contenedor-imagen"></div>`;

    document.getElementById("product-name").innerHTML = htmlContentToAppend;
}

function showCarousel() {
    let dibujarCarousel = "";
    dibujarCarousel = `<div id="carouselExampleControls" class="carousel slide imgC mx-auto shadow p-3 mb-5 bg-body rounded" data-bs-ride="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="2500">
            <img src="${currentCategoriesArray.images[0]}" class="d-block w-100 img-fluid rounded" alt="${currentCategoriesArray.description}">
        </div>
        <div class="carousel-item" data-bs-interval="2500">
            <img src="${currentCategoriesArray.images[1]}" class="d-block w-100 img-fluid rounded" alt="${currentCategoriesArray.description}">
        </div>
        <div class="carousel-item" data-bs-interval="2500">
            <img src="${currentCategoriesArray.images[2]}" class="d-block w-100 img-fluid rounded" alt="${currentCategoriesArray.description}">
        </div>
        <div class="carousel-item" data-bs-interval="2500">
            <img src="${currentCategoriesArray.images[3]}" class="d-block w-100 img-fluid rounded" alt="${currentCategoriesArray.description}">
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon fondoCeleste" aria-hidden="true"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon fondoCeleste" aria-hidden="true"></span> 
    </button>
</div>`

document.getElementById("contenedor-carousel").innerHTML = dibujarCarousel;
}

//function que itera sobre el array de images del JSON y las muestra en pantalla.
function showimgs() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.images.length; i++) {
        htmlContentToAppend += `
        <div class="shadow p-3 mb-5 bg-body rounded">
            <img src="${currentCategoriesArray.images[i]} " alt="${currentCategoriesArray.description}" class="img-fluid rounded mx-auto d-block">
            <br>
        </div>`
    }

    document.getElementById("contenedor-imagen").innerHTML = htmlContentToAppend;
}

function setCatID(id) { //funcion que setea el localStorage con el key "CatID1, y el valor id"
    localStorage.setItem("catID1", id); //Diferente seteo //
    window.location = "categories.html" //redirecciona a categories.html
}

function setCatID2(id) { //funcion que setea el localStorage con el key "CatID1, y el valor id"
    localStorage.setItem("catID1", id);

    window.location = "product-info.html" //redirecciona a product-info.html
}

function showComments() {
    let contenido = ""; //en esta variable se va a ver todo(comentarios con usuarios fechas estrellas descripción.).

    for (let i = 0; i < currentComments.length; i++) { //iteramos sobre los cometarios que me trae el JSON
        let htmlContentToAppend = ""; //limpiador
        let comentarios = currentComments[i]; //cada comentario de cada usuario

        //dibujamos estrellas
        for (let i = 1; i < 6; i++) { //se va a repetir una condicion de 1 a 5 estrellas que es el max de estrellas posibles

            //Estrellas reseña
            if (i <= comentarios.score) {
                htmlContentToAppend += ` 
            <span class="fa fa-star checked"></span>`
            } else {
                htmlContentToAppend += ` <span class="fa fa-star"></span>`
            }
        }

        //dibujamos los atributos que nos importan del JSON
        contenido += `
            <div class="container shadow p-3 mb-5 bg-body rounded">
                <div>
                    <p><strong>${currentComments[i].user}</strong> - ${currentComments[i].dateTime} - ${htmlContentToAppend}
                    <p>${currentComments[i].description}</p>
                </div>
            </div> `

    }
    document.getElementById("comentarios").innerHTML = contenido;

}

//funcion que llama al fetch  y el objeto resultado es utilizado en la funcion showCommetns();
function datosComentarios() {

    getJSONData(setComments).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentComments = resultObj.data;
            showComments();
        } else {
            alert("Algo salio mal: " + resultObj.data);
        }
    })
}

function showRelatedImgs() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.relatedProducts.length; i++) {
        htmlContentToAppend += `
    <br>
    <div onclick="setCatID2(${currentCategoriesArray.relatedProducts[i].id})" class="shadow p-3 mb-5 bg-body rounded cursor-active">
    <h6 class="text-center p-2 display-6">${currentCategoriesArray.relatedProducts[i].name}<h6>
    <img src="${currentCategoriesArray.relatedProducts[i].image} " alt="${currentCategoriesArray.description}" class="img-fluid rounded mx-auto d-block">
    </div>`;
    }

    document.getElementById("productos-relacionados-div").innerHTML = htmlContentToAppend;
}

/*Funcion que cuando carga la pagina, hace un llamado al fetch y el objeto es utilizado en la funcion
  showCategoriesList();. Luego invoca a las funciones showimgs(), datosComentarios() y showRelatedImgs(); */
document.addEventListener("DOMContentLoaded", function () {
    getJSONData(setCat).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCategoriesArray = resultObj.data
            showCategoriesList();
            showimgs();
            datosComentarios();
            showRelatedImgs();
            showCarousel();

        } else {
            alert("Algo salió mal: " + resultObj.data);
        }
    });
    
});

document.getElementById("btnEnviar").addEventListener("click", function () {
   
    if (select.value == "1") {
        document.getElementById("comentarios").innerHTML += `
        <div class="container shadow p-3 mb-5 bg-body rounded">
            <div>
                <p><strong>${userEmail}</strong> - ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - <span class="fa fa-star checked"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star">
                <p>${textArea.value}</p>
            </div>
        </div> 
        `;
    } else if (select.value == "2") {
        document.getElementById("comentarios").innerHTML += `
        <div class="container shadow p-3 mb-5 bg-body rounded">
            <div>
                <p><strong>${userEmail}</strong> - ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span>
                <p>${textArea.value}</p>
            </div>
        </div> 
        `;
    } else if (select.value == "3") {
        document.getElementById("comentarios").innerHTML += `
        <div class="container shadow p-3 mb-5 bg-body rounded">
            <div>
                <p><strong>${userEmail}</strong> - ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span>
                <p>${textArea.value}</p>
            </div>
        </div> 
        `;
    } else if (select.value == "4") {
        document.getElementById("comentarios").innerHTML += `
        <div class="container shadow p-3 mb-5 bg-body rounded">
            <div>
                <p><strong>${userEmail}</strong> - ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star"></span>
                <p>${textArea.value}</p>
            </div>
        </div> 
        `;
    }
    else if (select.value == "5") {
        document.getElementById("comentarios").innerHTML += `
        <div class="container shadow p-3 mb-5 bg-body rounded">
            <div>
                <p><strong>${userEmail}</strong> - ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span>
                <p>${textArea.value}</p>
            </div>
        </div> 
        `;
    }
})

