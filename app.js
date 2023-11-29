// api
const baseUrl = `https://pokeapi.co/api/v2`;

async function getPokemonDataByName(name){
    const res = await fetch(`${baseUrl}/pokemon/${name}`);
    return res;
}

async function getAllPokemonsData(){
    const res = await fetch(`${baseUrl}/pokemon/?limit=60`);
    return await res.json();
}
getAllPokemonsData().then(data => console.log(data));


// ------------------------------------------------------
let currentPokemonId = 1;

const messageEl = document.getElementById('search-message');
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', searchPokemon);


function searchPokemon(e){
    e.preventDefault();
    messageEl.innerText = ''
    toggleSpinner();

    const formData = new FormData(e.target);
    getPokemonDataByName(formData.get('search-input')).then(res => {
        
        if(!res.ok){
            throw Error(res.status).message;
        }
        return res.json();
    }).then(data => {
        renderPokemon(data);
        e.target.reset();
    }).catch((err) => {
        if(err == 404){
            messageEl.innerText = 'Nothing Found';
        }
        
    }).finally(() => {
        toggleSpinner();
    });
}

function renderPokemon(data){
    const {id, name, sprites: {other: {dream_world: {front_default}}}} = data;
    currentPokemonId = id;
    const imgEl = document.getElementById('pokemon-img');
    const nameEl = document.getElementById('pokemon-name');
    nameEl.textContent = name;
    imgEl.src = front_default;
}

function toggleSpinner(){
    const searchBtn = document.getElementById('search-btn');
    searchBtn.classList.toggle('spinner');
}



function nextPokemonPick(){
    currentPokemonId += 1;
    getPokemonDataByName(currentPokemonId).then(res => res.json()).then(data => {
        renderPokemon(data);
    });;
}
function prevPokemonPick(){
    console.log(currentPokemonId);
    if(currentPokemonId === 1) return;
    currentPokemonId -= 1;
    getPokemonDataByName(currentPokemonId).then(res => res.json()).then(data => {
        renderPokemon(data);
    });
}


const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
prevBtn.addEventListener('click', prevPokemonPick)
nextBtn.addEventListener('click', nextPokemonPick)

document.addEventListener('DOMContentLoaded', () => {
    getPokemonDataByName(currentPokemonId).then(res => res.json()).then(data => {
        renderPokemon(data);
    });
})