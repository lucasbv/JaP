
function guardarDatos(){
    let datos = document.getElementById("formulario").elements;
    for(var i = 0; i<= datos.length - 1; i++){
        
        localStorage.setItem(datos[i].id, JSON.stringify(datos[i].value));

    }


}

function showDatos(){
    let datos = document.getElementById("formulario").elements;
    document.getElementById('email').value= localStorage.getItem('email');
    for(var i = 0; i<= datos.length ; i++){
        if (datos[i] != null && datos[i].value !== null && document.getElementById(datos[i].id)  !== null && document.getElementById(datos[i].id) !== 'email'){
            document.getElementById(datos[i].id).value = JSON.parse(localStorage.getItem(datos[i].id));

        }
        
        
    }

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    showDatos();
    

});