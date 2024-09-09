async function getData() {
    const result = await fetch('https://fakestoreapi.com/products/');
    const character = await result.json();
    const jsonArr = character.map(elemento => Object.entries(elemento));
    console.log(jsonArr)
    character.forEach(element => {
        const randomInt = randomImage(1, jsonArr.length);
        const ranIndex = randomInt;
        for(i = 0; i <= 3; i++){
            if(element.id == i){
                const card = document.createRange().createContextualFragment(`
                    
                    <div class="card card-1">
                        <h3>${jsonArr[ranIndex][1][1]}</h3>
                        <img src="${jsonArr[ranIndex][5][1]}" alt="">
                        <br>
                        <br>
                        <hr>
                        <p>$${jsonArr[ranIndex][2][1]} Peso</p>
                    </div>
                    
                    `)
                    const trips_row = document.querySelector('.trips-row');
                    trips_row.append(card);
            }
        }
    });

    function randomImage(min, max){
        return Math.floor(Math.random()* (max - min + 1) + min)
    }
}

const btn_validar = document.getElementById('btn-validar');
const validar = (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');
    const arr = [];
    const arrMessages = ["Nombre", "Email", "Mensaje"];
    arr.push(nombre, email, mensaje);
    for(i = 0; i < arr.length; i++){
        if(arr[i].value == ""){
            swal({
                title: `El campo ${arrMessages[i]} no puede estar vacío`,
                icon: "error",
                 })
                 return false;
        }
    }
    if(!emailValido(email.value)){
        swal({
            title: `El campo ${arrMessages[1]} no tiene el formato correcto`,
            icon: "error",
             })
             return false;
    }
    swal({
        title: `Datos enviados satisfactoriamente`,
        icon: "success",
         })
         nombre.value = "";
         email.value = "";
         mensaje.value = "";
    return true;

}

const emailValido = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

btn_validar.addEventListener("click", validar)
getData()