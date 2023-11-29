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

let currentPokemon = 0;

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', searchPokemon);


function searchPokemon(e){
    e.preventDefault();
    toggleSpinner();

    const formData = new FormData(e.target);
    getPokemonDataByName(formData.get('search-input')).then(res => {
        if(!res.ok){
            throw Error(res.status).message;
        }
        return res.json();
    }).then(data => {
        renderPokemon(data);
    }).catch((err) => {
        const messageEl = document.getElementById('search-message');

        if(err == 404){
            messageEl.innerText = 'Nothing Found';
        }
        

        
    }).finally(() => {
        toggleSpinner();
    });
}

function renderPokemon(data){
    const {id, name, sprites: {other: {dream_world: {front_default}}}} = data;
    currentPokemon = id;
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
    getPokemonDataByName(id + 1);
}