
let productoObj;
let htmlContentToAppend;
let productoPreCargado="https://japceibal.github.io/emercado-api/user_cart/25801" + EXT_TYPE;
let inputCartValue = 1;


function cantProductosCarrito(){
     document.getElementById("cartInputValue").addEventListener("input", function() {
     inputCartValue = document.getElementById("cartInputValue").value;
     if(inputCartValue < 0) {
       document.getElementById("cartInputValue").value = 0;
     }else {
        dibujarProducto();
     }
    });
}

function dibujarProducto() {
    htmlContentToAppend = `
    <div class="container">
        <div class="container mt-5"> 
            <h1 class="display-5 text-center"> Carrito de compras</h1>
        </div>
        <div class="container mt-4">
            <h4 class="display-7 text-center">Artículos a comprar</h4><br>
        </div>
    </div>

    <div class="container text-center mt-4">
        <div class="row">
            <div class="col">
            </div>
            <div class="col">
                <strong>Nombre</strong>
            </div>
            <div class="col">
                <strong>Costo</strong>
            </div>
            <div class="col">
                <strong>Cantidad</strong>
            </div>
            <div class="col">
                <strong>Subtotal</strong>
            </div>
        </div>
    </div> 

    <div class="container text-center">
        <div class="row">
            <div class="col">
            <hr>
                <img src="${productoObj.articles[0].image}" alt="${productoObj.articles[0].name}" id="miniatura" class="img-fluid float-start">            
            </div>
             <div class="col">
                 <hr><br>${productoObj.articles[0].name}
             </div>
            <div class="col">
                <hr><br>${productoObj.articles[0].currency} ${productoObj.articles[0].unitCost}        
            </div>
            <div class="col">
                <hr><br><input id="cartInputValue" class="form-control placeholder="0" type="number" value=${inputCartValue}>              
            </div>
            <div class="col">
                <hr><br><strong>${productoObj.articles[0].currency}</strong> <strong>${(productoObj.articles[0].unitCost * inputCartValue)}</strong>
            </div>
        </div>    
        <hr>
    </div>
    
    <div class="container mt-4">
        <h4>Tipo de envío</h4>
        <div class="form-check mt-4 mt-3">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
            <label class="form-check-label" for="exampleRadios1">
                Premium 2 a 5 días (15%)
            </label>
        </div>
        <div class="form-check mt-3">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
            <label class="form-check-label" for="exampleRadios2">
                Express 5 a 8 días (7%)
            </label>
        </div>
        <div class="form-check mt-3">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3">
            <label class="form-check-label" for="exampleRadios3">
                Standar 12 a 15 días (5%)
            </label>
        </div>
        <div class="container">
            <h4 class="mt-4">Dirección de envío</h4>
            <label class="mt-2">Calle</label>
            <input class="form-control w-50 mt-2" type="text">
            <label class="mt-4">Número</label>
            <input class="form-control w-25 mt-2" type="text">
            <label class="mt-4">Esquina</label>
            <input class="form-control w-50 mt-2" type="text">
        </div>
    </div>
    `;

    document.getElementById("productCart").innerHTML = htmlContentToAppend;
    cantProductosCarrito();
}

function productoPreCargadoObj(){
    
    getJSONData(productoPreCargado).then(function(resultObj){
        if(resultObj.status === "ok") {
            productoObj = resultObj.data;
            dibujarProducto();
        }else{
            alert("Algo salio mal: " + resultObj.data);
        } 
    })
}


document.addEventListener("DOMContentLoaded", function() {
    productoPreCargadoObj();
});