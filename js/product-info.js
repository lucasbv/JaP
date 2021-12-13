var product = {};
var comentario = {};
var related = [];
var promStar = 0;


function showImagesGallery(array){

    let htmlContentToAppend = "";
    let htmlContentToAppend2 = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        if (i===0){
            htmlContentToAppend +=`<div class="carousel-item active">
            <img src="`+imageSrc+`" class="d-block w-100" >
          </div>
            `
            htmlContentToAppend2 += `<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>`

        }else{
            htmlContentToAppend +=`<div class="carousel-item">
            <img src="`+imageSrc+`" class="d-block w-100" >
          </div>
            `
            htmlContentToAppend2 += `<li data-target="#carouselExampleIndicators" data-slide-to="`+i+`"></li>`

        }

        

        document.getElementById("carousel-img").innerHTML = htmlContentToAppend;
        document.getElementById("carousel-ind").innerHTML = htmlContentToAppend2;
    }
}
function showRelated(num, array){
    let htmlContentToAppend = "";
    for(let i = 0; i < num.length; i++){
        let relat = array[num[i]];

        htmlContentToAppend += `
                <a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-2">
                            <img src="` + relat.imgSrc + `" alt="" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ relat.name +`</h4>
                                <h4 class="mb-1">`+relat.currency+ relat.cost +`</h4>
                            </div>
                            <p class="mb-1"></p>
                        </div>
                    </div>
                </a>
                `
                document.getElementById("related-list-container").innerHTML = htmlContentToAppend;
                
    

    }
    


    

}
function calcularStars(n){
    let stars="";
    for(let i=0;i<5;i++){
        if(n>i){
            stars+=`<span class="fa fa-star checked"></span>`
        }else{
            stars+=`<span class="fa fa-star"></span>`
        }
     }
     return stars;
}
function nuevoCom(){
    let htmlContentToAppend = "";
    let asd = new Date();
    let puntos = calcularStars(document.getElementById("est").value);

    htmlContentToAppend +=`
        <a class="list-group-item">         
        <div class="row">
            
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ document.getElementById("nombreText").value +`</h4>
                    <small class="text-muted">`+asd+ ` </small>
                    <h4 class="mb-1">`+puntos +`</h4>
                </div>
                <p class="mb-1">` + document.getElementById("comentarioText").value + `</p>
            </div>
        </div>
    </a>
         `
         document.getElementById("comentarios").innerHTML += htmlContentToAppend;

}
function showComment(){
    let htmlContentToAppend = "";
    

    for(let i=0; i < comentario.length; i++){
        let comme = comentario[i];
        let puntos = calcularStars(comme.score);
        promStar+=comme.score;

        htmlContentToAppend +=`
        <a class="list-group-item">         
        <div class="row">
            
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ comme.user +`</h4>
                    <small class="text-muted">`+comme.dateTime+ ` </small>
                    <h4 class="mb-1">`+puntos +`</h4>
                </div>
                <p class="mb-1">` + comme.description + `</p>
            </div>
        </div>
    </a>
         `
         
         
         
        

        
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
    promStar=promStar/comentario.length;
    let puntos = calcularStars(promStar);
    document.getElementById("promStar").innerHTML = puntos + `<h7 class="text-muted">   4 reseñas</h7>`;

}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){

        product = resultObj.data;
        

        let productNameHTML  = document.getElementById("productName");
        let productDescHTML  = document.getElementById("productDescription");
        let productCostHTML  = document.getElementById("productCost");
        let productSoldHTML  = document.getElementById("productSold");
        let productCatHTML  = document.getElementById("productCat");
        

        productNameHTML.innerHTML= product.name;
        productDescHTML.innerHTML= product.description;
        productCostHTML.innerHTML= product.currency + product.cost ;
        productSoldHTML.innerHTML= product.soldCount +` vendidos`;
        productCatHTML.innerHTML= product.category;
        related = product.relatedProducts;

        showImagesGallery(product.images);



    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){

        comentario = resultObj.data;
        showComment();
        
        
    });
    getJSONData(PRODUCTS_URL).then(function(resultObj){

        showRelated(related, resultObj.data);
        
        
    });
    


});