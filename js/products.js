//array donde se cargarán los datos recibidos:
let categoriesArray = []; //declaro una lista vacia
 
//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array){ 
    let htmlContentToAppend = ""; //se declara como vacia pero le doy existencia
    let igualador = array.products; //declaro variable para recorrer los productos del array
    for(let i = 0; i < igualador.length; i++){ //lee cada uno de los elementos
        let category = igualador[i];
        htmlContentToAppend += `
        <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${category.name} - ${category.currency} ${category.cost}</h4>
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
 
document.addEventListener("DOMContentLoaded", ()=>{ //Cuando el documento se carga en la pagina se executa la funcion flecha.
    getJSONData(PRODUCT_AUTO).then(function(resultObj){ //traigo al json en forma de objeto js y despues cree una funcion a partir de el
        if (resultObj.status === "ok") //si el resultado es estrictamente igual a ok (status = comprobante si los datos fueron traidos)
        {
            categoriesArray = resultObj.data; //.data serian los datos del objeto que traje
            showCategoriesList(categoriesArray); //executo la funcion con el parametro de la variable datos del objeto.
        }
    });
});
