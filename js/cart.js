
let productoObj;
let htmlContentToAppend;
let productoPreCargado="https://japceibal.github.io/emercado-api/user_cart/25801" + EXT_TYPE;
let inputCartValue = 1;
let numeroCuentaID;
let inputNroTarjeta;
let inputCodSeguridad;
let inputIDvencimiento;


function cantProductosCarrito(){
     document.getElementById("cartInputValue").addEventListener("input", function() {
     inputCartValue = document.getElementById("cartInputValue").value;
     if(inputCartValue <= 0) {
       document.getElementById("cartInputValue").value = 1; //cantidad de productos no sea menor a 0.
     }else {
        dibujarProducto(); //actualizar el subtotal
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
    
    <div class="container mt-5">
        <h4>Tipo de envío</h4>
        <div class="form-check mt-4 mt-3">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1">
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
        <form action="#" method="get" class="row mt-4 needs-validation" novalidate>
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
            </div>
        

            <br><hr>

            <div class="container mt-4">
                <h4>Costos</h4>
                <ul class="list-group mt-3">
                
                    <li class="list-group-item">
                        <strong>Subtotal</strong>
                            <p>Costo unitario del producto por unidad <p class="text-end">${productoObj.articles[0].currency} ${(productoObj.articles[0].unitCost * inputCartValue)}</p></p>
                    </li>
                
                    <li class="list-group-item">
                        <strong>Costo de envío</strong>
                            <p>Según el tipo de envío <p class="text-end">Aqui va costo de envio ${productoObj.articles[0].currency} ${((productoObj.articles[0].unitCost * inputCartValue) * (0.15))}</p></p>
                    </li>
                
                    <li class="list-group-item mt"><strong>Total ($)</strong>
                        <p class="text-end">Aqui va Total <strong>${productoObj.articles[0].currency} ${((productoObj.articles[0].unitCost * inputCartValue) * (0.15) + (productoObj.articles[0].unitCost * inputCartValue))}</strong></p>
                    </li>
                </ul>
            </div>
        
            <br><hr>

            <div class="container mt-4">
                <h4>Forma de pago</h4>
                <p class="mt-4">No ha seleccionado</p>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioTransferBancaria">
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Transferencia bancaria
                                        </label>
                                    </div><hr>
                                    <div>
                                        Número de cuenta
                                    </div> 
                                    <div>      
                                        <input id="numeroCuentaID" class="form-control w-50 mt-2" type="text" required>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div>
                <button class="btn btn-primary mt-5 col-12" type="submit">Finalizar compra</button>
            </div>
        </form>
    </div>






    <br><br><br><br>
    <div class="container">
    <main>

      <form action="#" method="get" class="row mt-4 needs-validation" novalidate>
        <div class="col">
          <h1 class="mb-3">Registro</h1>
          <hr class="my-4" />
          <div class="row g-3">
            <div class="col-sm-6">
              <label for="nombre" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="nombre" required />
              <div class="invalid-feedback">
                Debe ingresar un nombre.
              </div>
            </div>

            <div class="col-sm-6">
              <label for="apellido" class="form-label">Apellido</label>
              <input type="text" class="form-control" id="apellido" required />
              <div class="invalid-feedback">
                Debe ingresar un apellido.
              </div>
            </div>

            <div class="col-12">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" required />
              <div class="invalid-feedback">
                Debe ingresar un email.
              </div>
            </div>

            <div class="col-sm-6">
              <label for="password1" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="password1" required />
              <div class="invalid-feedback">
                Debe ingresar una contraseña con al menos 6 caracteres.
              </div>
            </div>

            <div class="col-sm-6">
              <label for="password2" class="form-label">Repetir contraseña</label>
              <input type="password" class="form-control" id="password2" required />
              <div class="invalid-feedback">
                Debe ser igual a "contraseña".
              </div>
            </div>

            <div class="col-sm-12">
              <button type="button" class="btn btn-link ps-0" data-bs-toggle="modal" data-bs-target="#modalTerminos">
                Términos del servicio
              </button>
            </div>

            <button class="btn btn-primary" type="submit">Registrarme</button>
          </div>
        </div>
      </form>
      </main>

    `;

    document.getElementById("productCart").innerHTML = htmlContentToAppend;
    cantProductosCarrito();
       // Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

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
    
    //Desabilitamos numero de cuenta dentro del modal
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




});}

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
    });}