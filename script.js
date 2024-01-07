const pokemonContainer = $('#pokemon-container');
const pokemonIcon = $('#pokemon-icon');
const selectedCounter = $('#selected-counter');

let selectedPokemons = [];
let numSelected = 0;

function fetchPokemonData() {
    return $.get('https://pokeapi.co/api/v2/pokemon?limit=151');
}

function createPokemonGrid(pokemonData) {
    pokemonData.results.forEach(pokemon => {
        const pokemonElement = $(`<div class="pokemon" data-name="${pokemon.name}">
                                    <img src="images/${pokemon.name}.png" alt="${pokemon.name}">
                                    <p>${pokemon.name}</p>
                                </div>`);
        pokemonElement.click(() => togglePokemon(pokemon.name));
        pokemonContainer.append(pokemonElement);
    });
}

function togglePokemon(pokemonName) {
    const index = selectedPokemons.indexOf(pokemonName);
    if (index !== -1) {
        selectedPokemons.splice(index, 1);
    } else {
        selectedPokemons.push(pokemonName);
    }
    highlightSelected();
}

function highlightSelected() {
    $('.pokemon').removeClass('selected');
    selectedPokemons.forEach(name => {
        $(`.pokemon[data-name="${name}"]`).addClass('selected');
    });
    updateCounter();
    updatePokemonIcon();
}

function updateCounter() {
    numSelected = selectedPokemons.length;
    selectedCounter.text(`Selected: ${numSelected}`);
}

function updatePokemonIcon() {
    const selectedPokemonName = selectedPokemons.length > 0 ? selectedPokemons[selectedPokemons.length - 1] : null;
    const imagePath = selectedPokemonName ? `images/${selectedPokemonName}.png` : '';
    pokemonIcon.html(`<img src="${imagePath}" alt="${selectedPokemonName}">`);
}

function generateJSON() {
    const jsonContent = JSON.stringify({ highlighted_pokemons: selectedPokemons }, null, 2);
    console.log(jsonContent);
}

$(document).ready(function () {
    fetchPokemonData().done(data => createPokemonGrid(data));
});
