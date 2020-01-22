loadPokemons().then(loadEvolutions).then(() => {
    var items = document.getElementsByClassName("evolutions_item")
    items = Array.from(items)

    items.forEach((element, index) => {
        var children = element.children
        children = Array.from(children)
        
        children[0].src = pokemons[index].sprites.front_default
        children[1].children[1].innerText += pokemons[index].name
    });
});

async function loadEvolutions() {
    evolutions = [];
    for (let i = 1; i <= 10; i++) {
        chain = [];
        const x = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${i}`)
        let y = await x.json();
        chain_step = y.chain

        while (chain_step.evolves_to.length > 0) {
            actualPokemon = pokemons.find(item => item.name === chain_step.species.name)
            
            actualPokemon ? chain.push(actualPokemon) : null;
            
            chain_step = chain_step.evolves_to[0]
        }
        actualPokemon = pokemons.find(item => item.name === chain_step.species.name)
        actualPokemon ? chain.push(actualPokemon) : null;

        evolutions.push(chain)
    }
}
