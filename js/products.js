var productsArray = [];
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function showProducts(){
    let htmlContentToAppend = "";
    for(let i = 0; i < productsArray.length; i++){
        let products = productsArray[i]
        

        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))){

                htmlContentToAppend += `
                <div class="col-md-4">
                <div class="card mb-4 shadow-sm rounded-sm">
    <img src="` + products.imgSrc + `" class="card-img-top" alt="` + products.description + `">
    <div class="card-body">
      <h5 class="card-title">`+ products.name +`</h5>
      <p class="card-text">` + products.description + `</p>
      <p class="card-text"><small class="text-muted">` + products.soldCount + ` vendidos</small></p>
      <h5 class="card-text">`+products.currency+ products.cost +`</h5>
      <a href="product-info.html" class="stretched-link"></a>
    </div>
  </div>
                </div>
                `
                document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    

        }

        
    }

}

function sortAndShowProducts(sortCriteria, pArray){
    currentSortCriteria = sortCriteria;

    if(pArray != undefined){
        productsArray = pArray;
    }

    productsArray = sortProducts(currentSortCriteria, productsArray);

    //Muestro las categorías ordenadas
    showProducts();
}

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
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
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data)
        }
    }
    
    );
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProducts();
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

        showProducts();
    });

});