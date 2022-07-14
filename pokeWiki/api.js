
const searchInput = document.querySelector('#search-input');
const searchForm = document.querySelector('#search-form');
const carrouselImgOne = document.querySelector('#first-slide');
const carrouselImgTwo = document.querySelector('#second-slide');
const nameData = document.querySelector('#name');
const heightData = document.querySelector('#height');
const weightData = document.querySelector('#weight');
const abilitiesData = document.querySelector('#abilities');
const formsData = document.querySelector('#forms');
const statsData = document.querySelector('#stats');
const typesData = document.querySelector('#types');
const data = document.querySelector('#data');
const specieData = document.querySelector('#specie');
const newSearchButton = document.querySelector('#newSearchButton');

const togleContentDisplay = () => {
  data.classList.toggle('displayNone')
}

const concatUrl = (name) => {
  const lowerCaseName = name.toLowerCase()
  return `https://pokeapi.co/api/v2/pokemon/${lowerCaseName}/`
}

const fetchPokemonData = async (name) => {
  try {
    const url = concatUrl(name);
    const response = await fetch(url);
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}

const filterPokemonData = ({ name, height, weight, abilities, forms, sprites, stats, types, species }) => {
  return ({
    name, height, weight, abilities, forms, sprites, stats, types, species
  })
}

const printPokemonData = ({ name, height, weight, abilities, forms, sprites, stats, types, species }) => {
  carrouselImgOne.src = sprites.front_default;
  carrouselImgTwo.src = sprites.back_default;
  nameData.innerText = name;
  weightData.innerText = weight;
  heightData.innerText = height;
  abilitiesData.innerText = abilities.reduce((acc, cur) => acc + `${cur.ability.name}\n`, '');
  formsData.innerText = forms.reduce((acc, cur) => acc + `${cur.name}\n`, '');
  statsData.innerText = stats.reduce((acc, cur) => acc + `${cur.stat.name}: ${cur.base_stat}\n`, '');
  typesData.innerText = types.reduce((acc, cur) => acc + `${cur.type.name}\n`, '');
  specieData.innerText = species.name;
}

searchForm.addEventListener('submit', async (event) => {
  try {
    event.preventDefault();
    const pokeData = await fetchPokemonData(searchInput.value);
    const relevantData = filterPokemonData(pokeData);
    printPokemonData(relevantData);
    togleContentDisplay()
  } catch (error) {
    // const erroContainer = document.createElement('div');
    // erroContainer.width = '200px';
    // erroContainer.height = '100px'
    // const erroText = document.createElement('h2');
    // erroText.innerText = 'pokemon inexistente';
    // erroContainer.appendChild(erroText);
    // main.appendChild(erroContainer)
    alert('pokemon inexistente')
    console.error(error)
  }
});

newSearchButton.addEventListener('click', () => {
  searchInput.value = '';
  togleContentDisplay()
})

window.onload = () => {
  // togleContentDisplay()
}
