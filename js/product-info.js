let currentCategoriesArray = []; //asignamos un array vacio.
let getDatos = JSON.parse(localStorage.getItem("catID1")??[]); //seteo con diferente key //
JSON.stringify(getDatos);
let setCat = `https://japceibal.github.io/emercado-api/products/${getDatos}.json`;

function showCategoriesList(){ 
    
    let htmlContentToAppend = "";
    htmlContentToAppend = `
    <div>
        <h1><br>
            ${currentCategoriesArray.name}
            <br><br><hr>
        <h1>
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
        <p><strong>Imágenes ilustrativas</strong></p><br>
    </div>
    <div id="contenedor-imagen">
    </div>`;
    document.getElementById("product-name").innerHTML = htmlContentToAppend;
}
function showimgs() {         //DEBO MEJORAR CON UN FOR <----
    let htmlContentToAppend = "";
    htmlContentToAppend = `
    <div class="row">
        <div class="col-3">
            <img src="${currentCategoriesArray.images[0]} " alt="${currentCategoriesArray.description}" class="img-thumbnail">
        </div>
        <div class="col-3">
            <img src="${currentCategoriesArray.images[1]} " alt="${currentCategoriesArray.description}" class="img-thumbnail">
        </div>
        <div class="col-3">
            <img src="${currentCategoriesArray.images[2]} " alt="${currentCategoriesArray.description}" class="img-thumbnail">
        </div>
        <div class="col-3">
            <img src="${currentCategoriesArray.images[3]} " alt="${currentCategoriesArray.description}" class="img-thumbnail">
        </div>
    </div>
     `
    document.getElementById("contenedor-imagen").innerHTML = htmlContentToAppend;
}

document.getElementById("product-name").innerHTML = showCategoriesList();

function setCatID(id) { //funcion que setea el localStorage con el key "CatID, y el valor id"
    localStorage.setItem("catID1", id); //Diferente seteo //
    window.location = "categories.html" //redirecciona a product-info.html
}


function showComments() {
    let htmlContentToAppend = "";
    htmlContentToAppend = `
    <div>
        <br><br><h4>Comentarios</h4>
    <div>`

    document.getElementById("comentarios").innerHTML = htmlContentToAppend;
} 


document.addEventListener("DOMContentLoaded", function(){
    getJSONData(setCat).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList();
            showimgs();
            showComments();
        }else{
            alert("Algo salió mal: " + resultObj.data);
        }
    });
      
});