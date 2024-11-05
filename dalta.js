const baseUrl = "https://pokeapi.co/api/v2/";
let dataPokemon;
const infoDevuelta = document.getElementById("info-filtros")
const seleccion = document.getElementById("seleccion")
const prueba = document.getElementById("prueba")
const botonNext = document.getElementById("boton-next")
let paginacion = 0

fetch ("https://pokeapi.co/api/v2/type/")
    .then(res => res.json())
    .then(data => data.results.forEach((item)=>{
        return filtros.innerHTML += `<option value="${item.name}">${item.name}</option>`
    }))

    const filtros = document.getElementById("filtros")

    filtros.addEventListener("change", (event) => {
        cambioFiltro(event.target.value);
      });

function cambioFiltro(valor){
    if(valor == ""){
        infoDevuelta.style = "display:none"
        prueba.style = "display:"
        botonNext.style = "display:"
        iniciarPokedex()
    }
    else{
        infoDevuelta.innerHTML = ""
        prueba.style = "display:none"
        botonNext.style = "display:none"
    }

    fetch (baseUrl+`/type/${valor}`)
    .then(res => res.json())
    .then(data => data.pokemon.forEach((item) => {return iniciarCarga(item.pokemon.name)}))
}


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
        .then(data => {infoDevuelta.innerHTML += `<div class="card col-sm-4 col-md-3 col-lg-2 m-2 bg-body-secondary" id="">
            <div id="carouselExample-${pokemonSeleccionado}" class="carousel slide">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="${data.sprites.front_default}" class="d-block w-100" alt="${data.name}">
                    </div>
                    <div class="carousel-item">
                    <img src="${data.sprites.back_default}" class="d-block w-100" alt="${data.name}">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample-${pokemonSeleccionado}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample-${pokemonSeleccionado}" data-bs-slide="next">
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
        </div> `; 
})
}

iniciarPokedex()
