//array donde se cargarán los datos recibidos:
let categoriesArray = []; //declaro una lista vacia
 
//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array){ 
    let htmlContentToAppend = ""; //se declara como vacia pero le doy existencia
    let recorrer_array = array.products; //declaro variable para recorrer los productos del array
    for(let i = 0; i < recorrer_array.length; i++){ //condicion que recorre cada uno de los elementos del array productos
        let category = recorrer_array[i]; //variable local que recorre todos los elementos dentro de la condicion del for
        htmlContentToAppend += `
        <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${category.name} - ${category.currency} ${category.cost}</h4>
                        <small class="text-muted">${category.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${category.description}</p>
                </div>
            </div>
        </div>
        `
        document.getElementById("productos-bold").innerHTML = htmlContentToAppend;
    }
    document.getElementById("nombre-categorias-bold").innerHTML = `${array.catName}`; //mostramos el nombre de la categoria en pantalla a traves del identificador "nombre-categorias-bold"
}
 //utilizamos dom para acceder al nodo con identificador "autos101" y agregarle contenido al HTML a traves del JSON
 //El simbolo de ${} hace que el contenido sea un objeto de JS el cual estara dentro del HTML


 /*
EJECUCIÓN:
-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.
 
*/

let getDatos = JSON.parse(localStorage.getItem("catID")??[]);
JSON.stringify(getDatos);
let setCat = `https://japceibal.github.io/emercado-api/cats_products/${getDatos}.json`;

document.addEventListener("DOMContentLoaded", ()=>{ //Cuando el documento se carga en la pagina, se executa la funcion flecha.
    getJSONData(setCat).then(function(resultObj){ //traigo al json en forma de objeto js y despues cree una funcion que tenga como parametro el objeto recibido
        if (resultObj.status === "ok") //si el resultado es estrictamente igual a ok (status = comprobante si los datos fueron traidos)
        {
            categoriesArray = resultObj.data; //actualizo la variable global como variable local y el objeto.data serian los datos del objeto que traje
            showCategoriesList(categoriesArray); //executo la funcion `showCategoriesList` con los datos obtenidos del objeto como parametro
        }
    });
});
