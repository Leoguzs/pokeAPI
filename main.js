const $pokemonContainer = document.querySelector('.pokemon-container')


let fetchPokemon = (id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(response => response.json()).then(json => {
        createPokemon(json)
    })

}
// con lo anterior ya podemos traer el json con el pokemon

    let fetchPokemons = (number) => {
    for(let i= 1; i<=number; i++) {
        fetchPokemon(i);
    }
}




const createPokemon = (pokemon) => {
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

    $pokemonContainer.appendChild(card)
}

fetchPokemons(9)