const $pokemonContainer = document.querySelector('.pokemon-container')
const $spinner = document.querySelector('#spinner') 
const $previous = document.querySelector('#previous')
const $next = document.querySelector('#next')

let offset = 1;
let limit = 11;

$previous.addEventListener('click', ()=> {
    if (offset != 1 ) {
        offset -=9;
        removeChildNodes($pokemonContainer)
        fetchPokemons(offset, limit)
    }
    
})

$next.addEventListener('click', ()=> {
    offset +=9;
    removeChildNodes($pokemonContainer)
    fetchPokemons(offset, limit)
})

let fetchPokemon = (id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(response => response.json()).then(json => {
        createPokemon(json)
        console.log(json)
        $spinner.style.display = "none"
    })

}
// con lo anterior ya podemos traer el json con el pokemon

    let fetchPokemons = (offset, limit) => {   //offset nos permite hacer la paginacion
        $spinner.style.display = "block"
        for(let i = offset; i<= offset + limit; i++) {
        fetchPokemon(i);
    }
}

const createPokemon = (pokemon) => {
    const flipCard = document.createElement('div')   //contenedor principal
    flipCard.classList.add('flip-card')

    const cardContainer = document.createElement('div')   //contenedor principal
    cardContainer.classList.add('card-container')

    flipCard.appendChild(cardContainer);

    const card = document.createElement('div')
    card.classList = 'pokemon-block'

    const spriteContainer = document.createElement('div')
    spriteContainer.classList = 'img-container'

    const pokemonImg = document.createElement('img')
    pokemonImg.src = pokemon.sprites.front_default

    spriteContainer.appendChild(pokemonImg)

    const number = document.createElement('p')
    number.textContent = `#${pokemon.id.toString().padStart(3, 0) }`   /*para que utilice dos ceros al principio  */

    const name = document.createElement('p')
    name.classList.add ('name')
    name.textContent= pokemon.name

    card.appendChild(spriteContainer)
    card.appendChild(number)
    card.appendChild(name)

    const cardBack = document.createElement('div')
    cardBack.classList.add('pokemon-block-back');
    
    cardBack.appendChild(progressBars(pokemon.stats))

    cardContainer.appendChild(card)
    cardContainer.appendChild(cardBack)

    $pokemonContainer.appendChild(flipCard)
}

const progressBars = (stats) =>{
    const statsContainer = document.createElement('div')
    statsContainer.classList = 'stats-container'

    for (let i = 0; i<3; i++){
        const stat = stats[i]
        const statPercent = stat.base_stat / 2 + "%";
        const statContainer = document.createElement('stat-container')
        statContainer.classList = 'stat-container'

        const statName = document.createElement('p')
        statName.textContent = stat.stat.name

        const progress = document.createElement('div')
        progress.classList = 'progress'

        const progressBar = document.createElement('div')
        progressBar.classList = 'progress-bar'
        progressBar.setAttribute("aria-valuenow", stat.base_stat);
        progressBar.setAttribute("aria-valuemin", 0);
        progressBar.setAttribute("aria-valuemax", 200);
        progressBar.style.width = statPercent;

        progressBar.textContent = stat.base_stat;

        progress.appendChild(progressBar)
        statContainer.appendChild(statName)
        statContainer.appendChild(progress)



        statsContainer.appendChild(statContainer)
    }
    return statsContainer;
}

const removeChildNodes = (parent) => {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

fetchPokemons(offset, limit)