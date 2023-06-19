function PokemonViewModel() {
    var self = this;
    self.pokemons = ko.observableArray([]);
    self.pokemon = ko.observableArray([]);
    // Variable observable para almacenar el Pok�mon seleccionado
    self.selectedPokemon = ko.observable();

    // Funci�n para cargar los Pok�mon desde la API
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
                alert("Error al cargar los Pok�mon.");
            }
        });
    };

    self.showPokemon = function (pokemon) {
        self.loadPokemonByID(pokemon.id, function () {
            $('#myModal').modal('show'); // Mostrar el modal despu�s de que se complete la carga

        });
    };

    // Funci�n para cargar UN Pok�mon desde la API
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
                    callback(); // Llamar al callback despu�s de completar la carga
                } else {
                    console.error("Error: La respuesta de la API no es un objeto.");
                }
            },
            error: function () {
                alert("Error al cargar los Pok�mon.");
            }
        });
    };



    // Funci�n auxiliar para capitalizar la primera letra
    self.capitalizeFirstLetter = function (text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    // Seleccionar un Pok�mon
    self.selectPokemon = function (pokemon) {
        self.selectedPokemon(pokemon);
    };

    // Cargar los Pok�mon al iniciar la p�gina
    self.loadPokemons();
}

// Crea una instancia del ViewModel de Pok�mon y aplica el binding de Knockout.js
var viewModel = new PokemonViewModel();
ko.applyBindings(viewModel);
