let currentCategoriesArray = []; //asignamos un array vacio.
let getDatos = JSON.parse(localStorage.getItem("catID")??[]);
JSON.stringify(getDatos);
let setCat = `https://japceibal.github.io/emercado-api/products/${getDatos}.json`;




function showCategoriesList(){ 
    let htmlContentToAppend = "";
    htmlContentToAppend = `
    <div>
        <h1>
            ${currentCategoriesArray.name}<hr>
        <h1>
    </div>`;
    document.getElementById("product-name").innerHTML = htmlContentToAppend
}

document.getElementById("product-name").innerHTML = showCategoriesList();

function setCatID(id) { //funcion que setea el localStorage con el key "CatID, y el valor id"
    localStorage.setItem("catID", id);
    window.location = "product-info.html" //redirecciona a product-info.html
}

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(setCat).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList()
        }else{
            alert("Algo salió mal: " + resultObj.data);
        }
    });  
}); 