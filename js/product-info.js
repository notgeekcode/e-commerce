let currentCategoriesArray = []; //asignamos un array vacio.
let getDatos = JSON.parse(localStorage.getItem("catID1")??[]); //seteo con diferente key //
JSON.stringify(getDatos);
let setCat = `https://japceibal.github.io/emercado-api/products/${getDatos}.json`;

//se le asigna a setComents la url del JSON consultado. En este caso los comentarios de los productos
let setComments = `https://japceibal.github.io/emercado-api/products_comments/${getDatos}.json`
let currentComments = [];


//funcion que dibuja en pantalla diferentes atributos del array currentCategoriesArray.
function showCategoriesList(){ 
    let htmlContentToAppend = "";
    htmlContentToAppend = `
    <div>
        <h1 class="text-center"><br>
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
        <p class="text-center h3"><strong>Imágenes ilustrativas</strong></p><br>
    </div>
    <div id="contenedor-imagen">
    </div>`;
    document.getElementById("product-name").innerHTML = htmlContentToAppend;
}

//function que itera sobre el array de images del JSON y las muestra en pantalla.
function showimgs() { 
    let htmlContentToAppend = "";
    for(let i = 0; i<currentCategoriesArray.images.length; i++){
    htmlContentToAppend += `
        <img src="${currentCategoriesArray.images[i]} " alt="${currentCategoriesArray.description}" class="img-thumbnail img-fluid rounded mx-auto d-block">
        <br>` 
    } 
     
    document.getElementById("contenedor-imagen").innerHTML = htmlContentToAppend;
}


function setCatID(id) { //funcion que setea el localStorage con el key "CatID, y el valor id"
    localStorage.setItem("catID1", id); //Diferente seteo //
    window.location = "categories.html" //redirecciona a product-info.html
}


function showComments() {
    let contenido = ""; //en esta variable se va a ver todo(comentarios con usuarios fechas estrellas descripción.).
   
    for(let i=0; i<currentComments.length; i++){ //iteramos sobre los cometarios que me trae el JSON
        let htmlContentToAppend = ""; //limpiador
        let comentarios = currentComments[i]; //cada comentario de cada usuario
        
        //dibujamos estrellas
        for(let i=1; i<6; i++){ //se va a repetir una condicion de 1 a 5 estrellas que es el max de estrellas posibles
           
            //Estrellas reseña
            if(i <= comentarios.score ){
            htmlContentToAppend += ` 
            <span class="fa fa-star checked"></span>`
            }else{ 
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
function datosComentarios(){
    
    getJSONData(setComments).then(function(resultObj){
        if(resultObj.status === "ok") {
            currentComments = resultObj.data; 
            showComments();
        }else{
            alert("Algo salio mal: " + resultObj.data);
        }
    })
}


function showRelatedImgs() { 
   
    let htmlContentToAppend = "";
    for(let i = 0; i<currentCategoriesArray.relatedProducts.length; i++){
    htmlContentToAppend += `
    <br>
    <div class="shadow p-3 mb-5 bg-body rounded">
    <h6 class="text-center p-2 display-6">${currentCategoriesArray.relatedProducts[i].name}<h6>
    <img src="${currentCategoriesArray.relatedProducts[i].image} " alt="${currentCategoriesArray.description}" class="img-thumbnail img-fluid rounded mx-auto d-block">
    </div>`;  
    } 
     
    document.getElementById("productos-relacionados-div").innerHTML = htmlContentToAppend; 
}

/*Funcion que cuando carga la pagina, hace un llamado al fetch y el objeto es utilizado en la funcion
  showCategoriesList();. Luego invoca a las funciones showimgs y datosComentarios(); */
document.addEventListener("DOMContentLoaded", function(){
    getJSONData(setCat).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList();
            showimgs();
            datosComentarios();
            showRelatedImgs()
        }else{
            alert("Algo salió mal: " + resultObj.data);
        } 
    });
});
 