//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){

    document.getElementById("submit").addEventListener("click", function(){

        let completo = true;
        let inputEmail = document.getElementById("inputEmail").value;
        let inputPass = document.getElementById("inputPass");
        if (localStorage.getItem('email') != ''){
            localStorage.removeItem('email');
        }

        if(inputEmail.value === ''){
            completo = false;
        }
        if(inputPass.value === ''){
            completo = false;
        }

        if(completo){
            localStorage.setItem('email', inputEmail);
            window.location = 'inicio.html';

        }else{
            alert("ingrese datos");
        }


    });

});