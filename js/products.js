const ORDER_ASC_BY_NAME = "AZ"; //asignamos constantes para poder utilizarlas como criterios a la hora de filtrar
const ORDER_DESC_BY_NAME = "ZA"; //asignamos constantes para poder utilizarlas como criterios a la hora de filtrar
const ORDER_BY_PROD_COUNT = "Cant."; //asignamos constantes para poder utilizarlas como criterios a la hora de filtrar
let currentCategoriesArray = []; //asignamos un array vacio.
let currentSortCriteria = undefined; //asignamos variables de tipo indefinido.
let minCount = undefined;            //asignamos variables de tipo indefinido.
let maxCount = undefined;            //asignamos variables de tipo indefinido.

function showCategoriesList(){ //funcion que muestra el listado de categorias 

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.products.length; i++){
        let category = currentCategoriesArray.products[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){
            //condicion que evalua los valores de los cammpos del filtrado por costos para devolvernos un nuevo listado
            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name} - ${category.currency} ${category.cost}</h4>
                            <small class="text-muted">${category.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("productos").innerHTML = htmlContentToAppend;
    }
    document.getElementById("nombre-categorias-bold").innerHTML = `${currentCategoriesArray.catName}`;
}   //mostramos el nombre de cada categoria del array en el elemento con identificador nombre-categrias-array

function sortCategories(criteria, array){ //funcion que ordena las categorias segun criterios a un array dado.
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(b, a) {  //boton precio de mayor a menor
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){ 
        result = array.sort(function(b, a) { //boton precio de menor a mayor
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){ //boton cantidad de articulos de mayor a menor
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setCatID(id) { //funcion que setea el localStorage con el key "CatID, y el valor id"
    localStorage.setItem("catID1", id);
    window.location = "product-info.html" //redirecciona a product-info.html
}

function sortAndShowCategories(sortCriteria, categoriesArray){ //ordenamos segun criterio al array por parametro
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray.products = categoriesArray;
    }

    currentCategoriesArray.products = sortCategories(currentSortCriteria, currentCategoriesArray.products);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

let getDatos = JSON.parse(localStorage.getItem("catID")??[]); //Asigno a la variable getDatos, el valor asociado
// al key de nombre catID a traves del localStorage, y dicho valor lo convierto en un objeto de js.
JSON.stringify(getDatos); //Ahora tranformo el contenido de getDatos en string
let setCat = `https://japceibal.github.io/emercado-api/cats_products/${getDatos}.json`;
//por ultimo asigno a la variable setCat la direccion de los json a trabajar con la variable incluida de getDatos.
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(){
    
    getJSONData(setCat).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList()
        }else{
            alert("Algo salió mal: " + resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = ""; //vaciamos el contenido
        document.getElementById("rangeFilterCountMax").value = ""; //vaciamos el contenido

        minCount = undefined; //asignamos undefined a las variables minCount y MaxCount
        maxCount = undefined; //asignamos undefined a las variables minCount y MaxCount

        showCategoriesList(); //mostramos las categorias sin filtrar
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});

//buscador de productos
document.getElementById("buscador").addEventListener("input", function() {
    let htmlContentToAppend = "";
    
    for(let i=0; i<currentCategoriesArray.products.length; i++) {
        if(currentCategoriesArray.products[i].name.toLowerCase().includes(document.getElementById("buscador").value.toLowerCase())) {
            
            htmlContentToAppend += `
                <div class="row">
                    <div class="col-3">
                        <img src="${currentCategoriesArray.products[i].image}" alt="${currentCategoriesArray.products[i].description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${currentCategoriesArray.products[i].name} - ${currentCategoriesArray.products[i].currency} ${currentCategoriesArray.products[i].cost}</h4>
                            <small class="text-muted">${currentCategoriesArray.products[i].soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${currentCategoriesArray.products[i].description}</p>
                    </div>
                </div>
            </div> `   
        }
        document.getElementById("productos").innerHTML = htmlContentToAppend;
    }
})
     








/* 
let listado = [];
let min = undefined;
let max = undefined;
let search = "";

function filtrarLibros(listaLibros) {

    let listaFiltrada = listaLibros.filter(libro => {
        return (parseInt(libro.paginas) >= min || min == undefined) && (parseInt(libro.paginas) <= max || max == undefined)
    });
    return listaFiltrada
}

function redirigir(id) {
    localStorage.setItem("libroID", id);
    window.location = "ver-libro.html";
}

function mostrarLibros(listaLibros) {
    document.getElementById("listado").innerHTML = "";

    for (let libro of listaLibros) {
        if (libro.titulo.toLowerCase().includes(search.toLowerCase())) {
            let li = `
            <li onclick="redirigir(${libro.id})">
                Título: ${libro.titulo} <br>
                Autor: ${libro.autor} <br>
                Editorial: ${libro.editorial} <br>
                Páginas: ${libro.paginas}
            </li> 
            <hr>`;

            document.getElementById("listado").innerHTML += li;
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(LIBROS_URL).then(resultObj => {
        if (resultObj.status == "ok") {
            listado = resultObj.data;
            mostrarLibros(listado);
        } else {
            alert("No se pudo....");
        }
    })



    document.getElementById("filtrar").addEventListener("click", function () {

        if (document.getElementById("rango-min").value != "") {
            min = parseInt(document.getElementById("rango-min").value);
        } else {
            min = undefined;
        }

        if (document.getElementById("rango-max").value != "") {
            max = parseInt(document.getElementById("rango-max").value);
        } else {
            max = undefined;
        }

        mostrarLibros(filtrarLibros(listado));

    })

    document.getElementById("limpiar").addEventListener("click", function () {
        min = undefined;
        max = undefined;
        mostrarLibros(listado);
        document.getElementById("rango-min").value = "";
        document.getElementById("rango-max").value = "";

    })

    document.getElementById("buscador").addEventListener("input", function () {
        search = document.getElementById("buscador").value;
        mostrarLibros(listado)
    })

    document.getElementById("sortPagDesc").addEventListener("click", function () {

        listado.sort(function (a, b) {
            return parseInt(b.paginas) - parseInt(a.paginas);
        });
        mostrarLibros(listado);
    })


}) */
