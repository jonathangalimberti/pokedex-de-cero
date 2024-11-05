const baseUrl = "https://pokeapi.co/api/v2/";
let dataPokemon;
const infoDevuelta = document.getElementById("muestrainfo")
const seleccion = document.getElementById("seleccion")
const prueba = document.getElementById("prueba")
let paginacion = 0

function iniciarPokedex(){

    fetch(baseUrl + `/pokemon/?limit=20&offset=${paginacion}`)
    .then(res => res.json())
    .then(data => { data.results.forEach((item) => {
        fetch (baseUrl + `/pokemon/${item.name}`)
        .then(res => res.json())
        .then(data => {; return prueba.innerHTML += `<div class="card col-sm-4 col-md-3 col-lg-2 m-2 bg-body-secondary" id="">
            <div id="carouselExample-${item.name}" class="carousel slide">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="${data.sprites.front_default}" class="d-block w-100" alt="${data.name}">
                    </div>
                    <div class="carousel-item">
                    <img src="${data.sprites.back_default}" class="d-block w-100" alt="${data.name}">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample-${item.name}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample-${item.name}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
                <div class="card-body">
                    <p class="card-text"><b>${data.name}</b></p>
                    <p class="card-text">Type: ${data.types[0].type.name}</p> 
                    <h5>Habilidades</h5>
                    <p class="card-text">${data.abilities[0].ability.name}</p>
                    <p class="card-text">${data.abilities[1].ability.name}</p>
                </div>
        </div>
 `
    })})})
}

function next(){
    paginacion = paginacion + 20
    iniciarPokedex()
}

function seleccionoPokemon() {
    let seleccion = document.getElementById("seleccion")
    let pokemonSeleccionado = seleccion.value
    iniciarCarga(pokemonSeleccionado)
}

function iniciarCarga(pokemonSeleccionado) {
    fetch(baseUrl + `/pokemon/${pokemonSeleccionado}`)
        .then(res => res.json())
        .then(data => {infoDevuelta.innerHTML = `<div class="card col-2 my-4" id="muestrainfo">
            <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="${data.sprites.front_default}" class="d-block w-100" alt="${pokemonSeleccionado}">
                    </div>
                    <div class="carousel-item">
                    <img src="${data.sprites.back_default}" class="d-block w-100" alt="${pokemonSeleccionado}">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
                <div class="card-body">
                  <p class="card-text">Tipo: ${data.types[0].type.name}</p> 
                  <p class="card-text">Nombre: <b>${pokemonSeleccionado}</b></p>
                  <p class="card-text">Habilidad: ${data.abilities[0].ability.name}</p>
                  <p class="card-text">Habilidad: ${data.abilities[1].ability.name}</p>
                </div>
        </div>
 `;
 ; console.log(data)
})
}

iniciarPokedex()
