function PokemonViewModel() {
    var self = this;
    self.pokemons = ko.observableArray([]);
    self.pokemon = ko.observableArray([]);
    // Variable observable para almacenar el Pokémon seleccionado
    self.selectedPokemon = ko.observable();

    // Función para cargar los Pokémon desde la API
    self.loadPokemons = function () {
        $.ajax({
            url: "api/Pokemon", // Ruta a tu controlador API
            type: "GET",
            success: function (data) {
                if (Array.isArray(data)) {
                    self.pokemons(data);
                } else {
                    console.error("Error: La respuesta de la API no es un array.");
                }
            },
            error: function () {
                alert("Error al cargar los Pokémon.");
            }
        });
    };

    self.showPokemon = function (pokemon) {
        self.loadPokemonByID(pokemon.id, function () {
            $('#myModal').modal('show'); // Mostrar el modal después de que se complete la carga

        });
    };

    // Función para cargar UN Pokémon desde la API
    self.loadPokemonByID = function (id, callback) {
        $.ajax({
            url: `api/Pokemon/${id}`, // Ruta a tu controlador API
            type: "GET",
            success: function (data) {
                if (typeof data === "object") {
                    // Manejar la respuesta como un objeto
                    self.pokemon([data]); // Envolver el objeto en un array
                    self.selectedPokemon(data.name)
                    console.log(self.selectedPokemon())
                    callback(); // Llamar al callback después de completar la carga
                } else {
                    console.error("Error: La respuesta de la API no es un objeto.");
                }
            },
            error: function () {
                alert("Error al cargar los Pokémon.");
            }
        });
    };



    // Función auxiliar para capitalizar la primera letra
    self.capitalizeFirstLetter = function (text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    // Seleccionar un Pokémon
    self.selectPokemon = function (pokemon) {
        self.selectedPokemon(pokemon);
    };

    // Cargar los Pokémon al iniciar la página
    self.loadPokemons();
}

// Crea una instancia del ViewModel de Pokémon y aplica el binding de Knockout.js
var viewModel = new PokemonViewModel();
ko.applyBindings(viewModel);
