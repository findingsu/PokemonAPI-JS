// Fetch data from the API
fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
  .then((res) => res.json())
  .then((data) => {
    pokemonArr = data.results;
    getPokemonData(pokemonArr);

    button.addEventListener("click", () => {
      const inputValue = input.value.trim();
      const foundPokemon = searchPokemon(inputValue);
      if (foundPokemon) {
        displayPokemon(foundPokemon);
      } else {
        alert("Pokémon not found");
      }
    });
  })
  .catch((err) => {
    console.log("error", err);
  });

// Initialize variables
const input = document.getElementById("search-input");
const button = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
let img = document.getElementById("sprite");
let types = document.getElementById("types");

let pokemonArr = [];

// Function to get and log Pokémon data
const getPokemonData = (pokemonArr) => {
  // console.log("Pokémon Data:", pokemonArr);

  return pokemonArr;
};

// Function to search for a Pokémon by ID or name
const searchPokemon = (inputValue) => {
  const inputValueString = inputValue.toString().toLowerCase().trim();

  // Check if the input is a valid number
  const isNumeric = (str) => /^\d+$/.test(str);
  if (isNumeric(inputValueString)) {
    const inputValueNumber = parseInt(inputValueString, 10);
    return pokemonArr.find((pokemon) => pokemon.id === inputValueNumber);
  } else {
    return pokemonArr.find(
      (pokemon) => pokemon.name.toLowerCase() === inputValueString
    );
  }
};

// Function to display the Pokémon
const displayPokemon = (foundPokemon) => {
  fetch(foundPokemon.url)
    .then((res) => res.json())
    .then((data) => {
      let pokemon = data;
      console.log(data);
      if (foundPokemon) {
        pokemonName.innerHTML = `${pokemon.name.toUpperCase()}`;
        pId.innerHTML = `${pokemon.id}`;
        weight.innerHTML = `${pokemon.weight}`;
        height.innerHTML = `${pokemon.height}`;
        hp.innerHTML = `${pokemon.stats[0].base_stat}`;
        attack.innerHTML = `${pokemon.stats[1].base_stat}`;
        defense.innerHTML = `${pokemon.stats[2].base_stat}`;
        specialAttack.innerHTML = `${pokemon.stats[3].base_stat}`;
        specialDefense.innerHTML = `${pokemon.stats[4].base_stat}`;
        speed.innerHTML = `${pokemon.stats[5].base_stat}`;
        img.src = `${pokemon.sprites.front_default}`;

        // Clear types before updating
        types.innerHTML = "";
        if (pokemon.types.length === 2) {
          types.innerHTML = `
            <span>${pokemon.types[0].type.name.toUpperCase()}</span>
            <span>${pokemon.types[1].type.name.toUpperCase()}</span>`;
        } else {
          types.innerHTML = `
            <span>${pokemon.types[0].type.name.toUpperCase()}</span>`;
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching Pokémon details:", error);
    });
};
