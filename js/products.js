//array donde se cargarán los datos recibidos:
let categoriesArray = [];
 
//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array){
    let htmlContentToAppend = "";
    let igualador = array.products;
    for(let i = 0; i < igualador.length; i++){
        let category = igualador[i];
        htmlContentToAppend += `
        <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${category.name}</h4>
                        <small class="text-muted">${category.soldCount} articulos</small>
                    </div>
                    <p class="mb-1">${category.description}</p>
                </div>
            </div>
        </div>
        `
        document.getElementById("autos101").innerHTML = htmlContentToAppend;
    }
}
 
 
/*
EJECUCIÓN:
 
-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.
 
*/
 
document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCT_AUTO).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showCategoriesList(categoriesArray);
        }
    });
});
