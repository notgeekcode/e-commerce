let productoObj;
let htmlContentToAppend;
let htmlContentToAppend1;
let inputCartValue = 1;
let numeroCuentaID;
let inputNroTarjeta;
let inputCodSeguridad;
let inputIDvencimiento;
let arrP = [];
let suma = 0;

//Servidor web
let productoPreCargado="https://japceibal.github.io/emercado-api/user_cart/25801" + EXT_TYPE;

//Servidor local
/* let getDatos = JSON.parse(localStorage.getItem("catID1") ?? []);
JSON.stringify(getDatos);
let productoPreCargado=`http://localhost:3000/user_cart/${getDatos}` + EXT_TYPE;
 */
function dibujarProducto() {
    arrP = JSON.parse(localStorage.getItem("data"));
    
    htmlContentToAppend = `
    <div class="container">
    <form action="#" id="form" method="get" class="row mt-4  form-control" novalidate>
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
    </div>`

    document.getElementById("productCart").innerHTML = htmlContentToAppend;



    for(let i = 0; i < arrP.length; i++) {
        htmlContentToAppend += `<div class="container text-center">
        <div class="row">
            <div class="col">
            <hr>
                <img src="${arrP[i].image}" alt="${arrP[i].name}" id="miniatura" class="img-fluid float-start ms-4">            
            </div>
             <div class="col">
                 <hr><br>${arrP[i].name}
             </div>
            <div class="col">
                <hr><br>${arrP[i].currency} ${arrP[i].unitCost}        
            </div>
            <div class="col">
                <hr><br><input id="cartInputValue" class="form-control" type="number" value=${inputCartValue} required>              
            </div>
            <div class="col">
                <hr><br><strong>${arrP[i].currency}</strong> <strong>${(arrP[i].unitCost * inputCartValue)}</strong>
            </div>
        </div>    
        <hr>
    </div>
    `}
    document.getElementById("productCart").innerHTML = htmlContentToAppend;
    
    htmlContentToAppend += `<div class="container mt-5">
        <div class="container">
        <h4>Tipo de envío</h4>
        <div class="form-check mt-4 mt-3">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked required>
            <label class="form-check-label" for="exampleRadios1">
                Premium 2 a 5 días (15%)
            </label>
        </div>
        <div class="form-check mt-3">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" required>
            <label class="form-check-label" for="exampleRadios2">
                Express 5 a 8 días (7%)
            </label>
        </div>
        <div class="form-check mt-3">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" required>
            <label class="form-check-label" for="exampleRadios3">
                Standar 12 a 15 días (5%)
            </label>
        </div>
        </div>
        
            <div class="container">
                <h4 class="mt-5">Dirección de envío</h4>
                <label class="mt-2">Calle</label>
                <input class="form-control w-50 mt-2" type="text" required>
                <div class="invalid-feedback">
                    Ingrese una calle.
                </div>
                <label class="mt-4">Número</label>
                <input class="form-control w-25 mt-2" type="text" required>
                <div class="invalid-feedback">
                    Ingrese un número.
                </div>
                <label class="mt-4">Esquina</label>
                <input class="form-control w-50 mt-2" type="text" required>
                <div class="invalid-feedback">
                    Ingrese una Esquina.
                </div>
                <br>
            </div>
            <br>
            <hr>`
            document.getElementById("productCart").innerHTML = htmlContentToAppend;
            
            
            for(let i = 0; i<arrP.length; i++){
            htmlContentToAppend += `
            <div class="container mt-4">
                <h4>Costos para el articulo <span class="colorRojo">${arrP[i].name}</span></h4>
                <ul class="list-group mt-3" id="listaCostos">
                
                    <li class="list-group-item">
                        <strong>Subtotal</strong>
                            <p>Costo unitario del producto por unidad <p class="text-end">${arrP[i].currency} ${arrP[i].unitCost}</p></p>
                    </li>
                
                    <li class="list-group-item">
                        <strong>Costo de envío</strong>
                            <p>Según el tipo de envío <p class="text-end">${arrP[i].currency} ${Math.round(((arrP[i].unitCost * inputCartValue) * (0.15)))}</p></p>
                    </li>
                
                    <li class="list-group-item mt"><strong>Total ($)</strong>
                        <p class="text-end"><strong>${arrP[i].currency} ${Math.round(((arrP[i].unitCost * inputCartValue) * (0.15) + (arrP[i].unitCost * inputCartValue)))}</strong></p>
                    </li>
                </ul>
                <br></div>`
            }
                
                document.getElementById("productCart").innerHTML = htmlContentToAppend;
                
                htmlContentToAppend += `
                <hr>
                <div class="container mt-4">
                    <h4>Forma de pago</h4>
                    <p class="mt-4" id="validarMetodoDePago">No ha seleccionado</p>
                    <button id="testbtn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Seleccionar forma de pago
                    </button>
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel"><strong>Forma de pago</strong></h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="form-check ms-4">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioTarjetaCredito" required>
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Tarjeta de crédito
                                        </label>
                                    </div>
                                    <div class="container"><hr>
                                        <div class="row">
                                            <div class="col">
                                                Número de tarjeta
                                            </div>
                                            <div class="col">
                                                Código de seguridad
                                            </div>
                                        </div>
                                    </div>
                                    <div class="container">
                                        <div class="row">
                                            <div class="col">
                                                <input id="inputNroTarjeta" class="form-control mt-2" type="text" required>
                                            </div>
                                            <div class="col">
                                                <input id="inputCodSeguridad" class="form-control mt-2" type="text" required>
                                            </div>
                                        </div>
                                        <div class="mt-3">
                                            Vencimiento (MM/AA)
                                        </div>
                                        <div class="col">
                                            <input class="form-control w-50 mt-2" type="text" id="inputIDvencimiento" required>
                                        </div>
                                        <div class="form-check mt-3">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioTransferBancaria" required>
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                Transferencia bancaria
                                            </label>
                                        </div><hr>
                                        <div>
                                            Número de cuenta
                                        </div> 
                                        <div>      
                                            <input id="numeroCuentaID" class="form-control w-50 mt-2 mb-4" type="text" required>
                                        </div>
                                        <div class="modal-footer">
                                            <button id="closeModal" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div>
                    <button id="btnFinalizar" class="btn btn-primary mt-5 mb-4 col-12" type="submit">Finalizar compra</button>
                </div>
            </div>
        
    </div></form></div>
    `;

    document.getElementById("productCart").innerHTML = htmlContentToAppend;
    cantProductosCarrito();
       
    var form = document.getElementById("form");
  
    form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        validarModal(); /*si el usuario intenta enviar el formulario sin haber ingresado al modal, 
        le mostraremos una alerta (de todas formas el form esta en estado no validado)*/
    }else {
        validarFormulario();
    }
        form.classList.add('was-validated')
    })
      
      
    /*al cambiar la cantidad de productos se le pide al usuario ingresar
    nuevamente su método de pago y éste puede ser visualizado de manera correcta*/
    setOFF_TransferBancaria(); 
    setOFF_TarjetaCredito();

    //al cerrar la alerta de compra exitosa, el usuario sera redireccionado a categories.html
    closeAlertSuccesBuy(); 
    
    //Calcular cada tipo de envio.
    quincePorciento();
    sietePorciento();
    cincoPorciento();

    //evento que se lanza al cerrar el modal. 
    eventoCloseModal();


    //Si el formulario no está validado mostrar un mensaje al usuario.
    document.getElementById("btnFinalizar").addEventListener("click", function() {
        if((document.getElementById("numeroCuentaID").value == "" && document.getElementById("flexRadioTransferBancaria").checked == false) && (document.getElementById("flexRadioTarjetaCredito").checked == true && document.getElementById("inputNroTarjeta").value != "" && document.getElementById("inputCodSeguridad").value != "" && document.getElementById("inputIDvencimiento").value != "")){
            document.getElementById("validarMetodoDePago").innerHTML = `<p class="mt-4 forma-pago"><span class="forma-pago-negro">Usted ha seleccionado</span> <strong>Tarjeta de crédito</strong> <span class="forma-pago-negro">como método de pago.</p>`;
        }else if((document.getElementById("numeroCuentaID").value != "" && document.getElementById("flexRadioTransferBancaria").checked == true) && (document.getElementById("flexRadioTarjetaCredito").checked == false && document.getElementById("inputNroTarjeta").value == "" && document.getElementById("inputCodSeguridad").value == "" && document.getElementById("inputIDvencimiento").value == "")) {
            document.getElementById("validarMetodoDePago").innerHTML = `<p class="mt-4 forma-pago"><span class="forma-pago-negro">Usted ha seleccionado</span> <strong>Transferencia Bancaria</strong> <span class="forma-pago-negro">como método de pago.</p>`;
        }
    })
}

//Si los checkbox dentro del modal son false mostramos alerta.
function validarModal() {
    if(document.getElementById("flexRadioTransferBancaria").checked == false && document.getElementById("flexRadioTarjetaCredito").checked == false) {
        document.getElementById("validarMetodoDePago").innerHTML = `<p class="forma-pago-rojo">Debe seleccionar una forma de pago.</p>`
    }
}

function validarFormulario() {
    if(form.checkValidity) {
        showAlertSuccess();
    }
}

//validación dentro del modal
function eventoCloseModal() {
    document.getElementById("closeModal").addEventListener("click", function() {
        if((document.getElementById("numeroCuentaID").value == "" && document.getElementById("flexRadioTransferBancaria").checked == false) && (document.getElementById("flexRadioTarjetaCredito").checked == true && document.getElementById("inputNroTarjeta").value != "" && document.getElementById("inputCodSeguridad").value != "" && document.getElementById("inputIDvencimiento").value != "")){
            document.getElementById("validarMetodoDePago").innerHTML = `<p class="mt-4 forma-pago"><span class="forma-pago-negro">Usted ha seleccionado</span> <strong>Tarjeta de crédito</strong> <span class="forma-pago-negro">como método de pago.</p>`;
        }else if((document.getElementById("numeroCuentaID").value != "" && document.getElementById("flexRadioTransferBancaria").checked == true) && (document.getElementById("flexRadioTarjetaCredito").checked == false && document.getElementById("inputNroTarjeta").value == "" && document.getElementById("inputCodSeguridad").value == "" && document.getElementById("inputIDvencimiento").value == "")) {
            document.getElementById("validarMetodoDePago").innerHTML = `<p class="mt-4 forma-pago"><span class="forma-pago-negro">Usted ha seleccionado</span> <strong>Transferencia Bancaria</strong> <span class="forma-pago-negro">como método de pago.</p>`;
        }else {
            document.getElementById("validarMetodoDePago").innerHTML = `<p class="forma-pago-rojo">Debe seleccionar una forma de pago.</p>`
        }
    })
}

function productoPreCargadoObj(){
    
    getJSONData(productoPreCargado).then(function(resultObj){
        if(resultObj.status === "ok") {
            productoObj = resultObj.data;
            dibujarProducto();
            setOFF_TransferBancaria(); //funcion dentro del modal.
            setOFF_TarjetaCredito();  //funcion dentro del modal.
        }else{
            alert("Algo salio mal: " + resultObj.data);
        } 
    })
}

document.addEventListener("DOMContentLoaded", function() {
    productoPreCargadoObj();
});

//funcion dentro del modal.
function setOFF_TransferBancaria() {
    document.getElementById("flexRadioTarjetaCredito").addEventListener("click", function() {
    
        //Desabilitamos Número de cuenta dentro del modal
        numeroCuentaID = document.getElementById("numeroCuentaID");
        numeroCuentaID.setAttribute("disabled", "");

        //Habilitamos: Nro de tarjeta, Cod seguridad y Vencimiento.
        inputNroTarjeta = document.getElementById("inputNroTarjeta");
        inputNroTarjeta.removeAttribute("disabled");

        inputCodSeguridad = document.getElementById("inputCodSeguridad");
        inputCodSeguridad.removeAttribute("disabled");

        inputIDvencimiento = document.getElementById("inputIDvencimiento");
        inputIDvencimiento.removeAttribute("disabled");

        //Limpiamos el contenido
        numeroCuentaID.value = "";
    })
}

//funcion dentro del modal.
function setOFF_TarjetaCredito() {
    document.getElementById("flexRadioTransferBancaria").addEventListener("click", function() {
        
        //Desabilitamos Nro Tarjeta, Cod Seguridad y Vencimiento.
        inputNroTarjeta = document.getElementById("inputNroTarjeta");
        inputNroTarjeta.setAttribute("disabled", "");
        
        inputCodSeguridad = document.getElementById("inputCodSeguridad");
        inputCodSeguridad.setAttribute("disabled", "");
        
        inputIDvencimiento = document.getElementById("inputIDvencimiento");
        inputIDvencimiento.setAttribute("disabled", "");

        //Habilitamos el campo: Número de cuenta.
        numeroCuentaID = document.getElementById("numeroCuentaID"); 
        numeroCuentaID.removeAttribute("disabled");

        //limpiamos el contenido
        inputNroTarjeta.value = "";
        inputCodSeguridad.value = "";
        inputIDvencimiento.value = ""; 
    })
}

function showAlertSuccess() {
    document.getElementById("alert-successCompra").classList.add("show");
} 

function cantProductosCarrito(){
    document.getElementById("cartInputValue").addEventListener("input", function() {
        inputCartValue = document.getElementById("cartInputValue").value;
        if(inputCartValue <= 0) {
            document.getElementById("cartInputValue").value = ""; //al quedar vacio no sera validado por el form.
        }else {
        dibujarProducto(); //actualizar el subtotal
        }
    });
}

function closeAlertSuccesBuy() {
    document.getElementById("closeAlertSuccess").addEventListener("click", function() {
        window.location = "categories.html";
    })
}

//Tipo de envio: 15%
function quincePorciento() {
    document.getElementById("exampleRadios1").addEventListener("click", function() {
        for(let i = 0; i < arrP.length; i++) {
        document.getElementById("listaCostos").innerHTML = `
        <ul class="list-group" checked>
                
            <li class="list-group-item">
                <strong>Subtotal</strong>
                    <p>Costo unitario del producto por unidad <p class="text-end">${arrP[i].currency} ${Math.round((arrP[i].unitCost * inputCartValue))}</p></p>
            </li>
                
            <li class="list-group-item">
                <strong>Costo de envío</strong>
                    <p>Según el tipo de envío <p class="text-end">${arrP[i].currency} ${Math.round(((arrP[i].unitCost * inputCartValue) * (0.15)))}</p></p>
            </li>
                
            <li class="list-group-item mt"><strong>Total ($)</strong>
                <p class="text-end"><strong>${arrP[i].currency} ${Math.round(((arrP[i].unitCost * inputCartValue) * (0.15) + (arrP[i].unitCost * inputCartValue)))}</strong></p>
            </li>
        </ul>
        `}
    })
}

//Tipo de envio: 7%
function sietePorciento() {
        document.getElementById("exampleRadios2").addEventListener("click", function() {
            for(let i = 0; i < arrP.length; i++) {
            document.getElementById("listaCostos").innerHTML = `
            <ul class="list-group">
                
                    <li class="list-group-item" checked>
                        <strong>Subtotal</strong>
                            <p>Costo unitario del producto por unidad <p class="text-end">${arrP[i].currency} ${Math.round((arrP[i].unitCost * inputCartValue))}</p></p>
                    </li>
                
                    <li class="list-group-item">
                        <strong>Costo de envío</strong>
                            <p>Según el tipo de envío <p class="text-end">${arrP[i].currency} ${Math.round(((arrP[i].unitCost * inputCartValue) * (0.07)))}</p></p>
                    </li>
                
                    <li class="list-group-item mt"><strong>Total ($)</strong>
                        <p class="text-end"><strong>${arrP[i].currency} ${Math.round(((arrP[i].unitCost * inputCartValue) * (0.07) + (arrP[i].unitCost * inputCartValue)))}</strong></p>
                    </li>
                </ul>
            `}
        })
}

//Tipo de envio: 5%
function cincoPorciento() {
        document.getElementById("exampleRadios3").addEventListener("click", function() {
            for(let i = 0; i < arrP.length; i++) {
            document.getElementById("listaCostos").innerHTML = `
            <ul class="list-group" checked>
                
                    <li class="list-group-item">
                        <strong>Subtotal</strong>
                            <p>Costo unitario del producto por unidad <p class="text-end">${arrP[i].currency} ${Math.round((arrP[i].unitCost * inputCartValue))}</p></p>
                    </li>
                
                    <li class="list-group-item">
                        <strong>Costo de envío</strong>
                            <p>Según el tipo de envío <p class="text-end">${arrP[i].currency} ${Math.round(((arrP[i].unitCost * inputCartValue) * (0.05)))}</p></p>
                    </li>
                
                    <li class="list-group-item mt"><strong>Total ($)</strong>
                        <p class="text-end"><strong>${arrP[i].currency} ${Math.round(((arrP[i].unitCost * inputCartValue) * (0.05) + (arrP[i].unitCost * inputCartValue)))}</strong></p>
                    </li>
                </ul>
            `}
        })
}