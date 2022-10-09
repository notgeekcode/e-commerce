
let productoObj;
let htmlContentToAppend;
let productoPreCargado="https://japceibal.github.io/emercado-api/user_cart/25801" + EXT_TYPE;
    
/*${productoObj.articles[0].name}*/

function dibujarProducto() {
    
    htmlContentToAppend = `
    <div class="container">
        <div class="container mt-5"> 
            <h1 class="display-5 text-center"> Carrito de compras</h1>
        </div>
        <div class="container mt-5">
            <h4 class="display-7 text-center">Artículos a comprar</h4>
        </div>
        <div class="container text-center mt-4">
            <div class="row">
                <div class="col">
                <br><hr>
                    <img src="${productoObj.articles[0].image}" alt="${productoObj.articles[0].name}" id="miniatura" class="img-fluid float-start">            
                </div>
                <div class="col">
                    <strong>Nombre</strong>
                    <hr><br>${productoObj.articles[0].name}
                </div>
                <div class="col">
                    <strong>Costo</strong>
                    <hr><br>${productoObj.articles[0].currency} ${productoObj.articles[0].unitCost}           
                </div>
                <div class="col">
                    <strong>Cantidad</strong>
                    <hr><br><input class="form-control type="text" placeholder="0">              
                </div>
                <div class="col">
                    <strong>Subtotal</strong>
                    <hr><br><strong>${productoObj.articles[0].currency}</strong> <strong>${productoObj.articles[0].unitCost}</strong>
                </div>
            </div>
            <hr>
        </div>
    </div>
    `;

    document.getElementById("productCart").innerHTML = htmlContentToAppend;
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
    dibujarProducto();

})