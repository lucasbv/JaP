let variabl = {};
let nose = [];
let subTotalP=0;
let subTotalU=0;
let suma =0;
let suma1=0;

function showCart(){
    let htmlContentToAppend = "";
    
    for(let i = 0; i < nose.length; i++){
        let carrito=nose[i];
        if (carrito.currency==="UYU"){
            subTotalP+=carrito.unitCost;
        }else{
            subTotalU+=carrito.unitCost;
        };

        htmlContentToAppend += `<a class="list-group-item rounded-sm ">
        <div class="row">
            <div class="col-3">
                <img src="`+carrito.src+`" alt="" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">`+carrito.name+`</h4>
                    
                    <h5 class="mb-1">`+carrito.currency+carrito.unitCost+`</h4>
                    
                </div><br>
                <div class="input-group mb-3 col-4">
                  <input name="inputCant" type="text" id="`+carrito.name+`" class="form-control" placeholder="1" aria-label="1" aria-describedby="basic-addon2" value="`+carrito.count+`">
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2">Unidades</span>
                  </div>
                </div>
            </div>
        </div>
    </a>`
    document.getElementById("carritoLista").innerHTML = htmlContentToAppend;

    }
    showPrices();

}

function showPrices(envio){
    let htmlContentToAppend = "";
    let precioS =0;
    let total =0;
    let pEnvio=0;
    
    for(let i = 0; i < nose.length; i++){
        let carrito=nose[i];
        if (carrito.currency==="UYU"){
            precioS=carrito.unitCost*document.getElementById(carrito.name).value;

        }else{
            subTotalU=carrito.unitCost*document.getElementById(carrito.name).value;
        }
        
    }
    total = precioS+(subTotalU*40);
    
    if(envio==null){
        

    }else{
        suma++;
        pEnvio= total*envio;
        total = pEnvio+total;

    }
    

    htmlContentToAppend+=`<br>
    <h4 class="font-weight-bold">Resumen del pedido</h4><br>
    <div class="text-muted">
    <h5>SubTotal(UYU): `+precioS+`</h5>
    <h5>SubTotal(USD): `+subTotalU+`</h5><br></div>
    `
    document.getElementById("precios").innerHTML = htmlContentToAppend;
    document.getElementById("precios2").innerHTML=`<br>
    <h5 class="text-muted">Costo de envío: `+pEnvio+`</h5><hr>
    <h5 class="text-dark">TOTAL(UYU): `+total+`</h5>
    `

}
function validar(){

    if(suma <= 0 && suma1 <=0){
        alert('Seleccione método de envío o pago');
    }
    else if(suma1 <=0){
        alert('Seleccione método de envío o pago');
        
    }else{
        alert('compra realizada');
    }
    
    

    
}

function payment(){
    if (document.getElementById("exampleRadios2").checked){
        document.getElementById("card-name").disabled = true;
        document.getElementById("card-number").disabled = true;
        document.getElementById("card-date").disabled = true;
        document.getElementById("card-cvv").disabled = true;
        document.getElementById("bank-name").disabled = false;
        document.getElementById("bank-number").disabled = false;
    }else if (document.getElementById("exampleRadios1").checked){
        document.getElementById("bank-name").disabled = true;
        document.getElementById("bank-number").disabled = true;
        document.getElementById("card-name").disabled = false;
        document.getElementById("card-number").disabled = false;
        document.getElementById("card-date").disabled = false;
        document.getElementById("card-cvv").disabled = false;
    }
    suma1++;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
    
    
    getJSONData(CART_INFO_URL).then(function(resultObj){
        variabl=resultObj.data;
        

        if(resultObj.status === "ok"){
            nose = variabl["articles"];
            showCart();
            

        }
        let elementos = document.getElementsByName("inputCant");

   for(let el of elementos){
       el.addEventListener("keyup", showPrices);
   }
    })

   


    

});
