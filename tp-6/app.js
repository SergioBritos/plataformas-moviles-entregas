document.addEventListener("DOMContentLoaded", function () {
    // Lógica para conectarse con la PokéAPI y cargar la lista de Pokémon
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(response => response.json())
      .then(data => {
        const pokemonList = document.getElementById("pokemonList");
  
        data.results.forEach(pokemon => {
          const listItem = document.createElement("li");
          listItem.className = "list-group-item";
          listItem.textContent = pokemon.name;
  
          const detailsButton = document.createElement("button");
          detailsButton.className = "btn btn-primary btn-sm ml-2";
          detailsButton.textContent = "Detalles";
          detailsButton.addEventListener("click", () => {
            showPokemonDetails(pokemon.url);
          });
  
          listItem.appendChild(detailsButton);
          pokemonList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error fetching Pokémon list:', error);
      });
  
    // Función para mostrar la información adicional del Pokémon
    function showPokemonDetails(url) {
      fetch(url)
        .then(response => response.json())
        .then(pokemon => {
          const modalTitle = document.getElementById("modalTitle");
          const modalBody = document.getElementById("modalBody");
  
          modalTitle.textContent = `Información de ${pokemon.name}`;
          modalBody.innerHTML = `
            <p>ID: ${pokemon.id}</p>
            <p>Altura: ${pokemon.height}</p>
            <p>Peso: ${pokemon.weight}</p>
            <p>Tipo: ${pokemon.types.map(type => type.type.name).join(", ")}</p>
          `;
  
          $("#pokemonModal").modal("show");
        })
        .catch(error => {
          console.error('Error fetching Pokémon details:', error);
        });
    }
  });
