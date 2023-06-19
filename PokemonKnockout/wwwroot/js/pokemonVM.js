function PokemonViewModel() {
    var self = this;
    self.pokemons = ko.observableArray([]);
    self.pokemon = ko.observableArray([]);
    self.moves = ko.observableArray([]);
    self.selectedMove = ko.observable();
    self.selectedMoveTo = ko.observable();
    self.selectedName = ko.observable();
    // Variable observable para almacenar el Pokémon seleccionado
    self.selectedPokemon = ko.observable();

    // Función para cargar los Pokémon desde la API
    self.loadPokemons = function () {
        $.ajax({
            url: "api/Pokemon", // Ruta a tu controlador API
            type: "GET",
            success: function (data) {
                if (Array.isArray(data)) {

                    // Convertir el objeto a una cadena JSON
                    var pokemonsDataString = JSON.stringify(data);

                    // Guardar el objeto en el localStorage
                    localStorage.setItem('pokemons', pokemonsDataString);

                } else {
                    console.error("Error: La respuesta de la API no es un array.");
                }
            },
            error: function () {
                alert("Error al cargar los Pokémon.");
            }
        });

        // Obtener la cadena JSON del localStorage
        var savedPokemonsDataString = localStorage.getItem('pokemons');

        // Convertir la cadena JSON a un objeto
        var savedPokemonsData = JSON.parse(savedPokemonsDataString);

        // Utilizar los valores en tu vista modelo
        self.pokemons(savedPokemonsData);

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
                    //self.pokemon([data]); // Envolver el objeto en un array
                    //self.selectedPokemon(data.name);
                    self.moves(data.moves);

                    // recorro el array para buscar la favMove
                    // recupero el array original
                    var arrayData = JSON.parse(localStorage.getItem('pokemons'));

                    //var arrayMoves = data.moves
                    //arrayMoves.forEach(function (item) {
                    //    self.moves.push(item.move.name)
                    //})

                    // lo recorro hasta coincidir con el name del pokemon para recuperar la favMove
                    arrayData.forEach(function (item) {
                        if (item.id === id) {

                            var selectedPokemonObj =
                            {
                                height: data.height,
                                weight: data.weight,
                                moves: data.moves,
                                name: data.name,
                                sprites: data.sprites,
                                favMove: item.favMove
                            }

                            self.pokemon([selectedPokemonObj]);
                            self.selectedMove(item.favMove);
                            self.selectedName(data.name);

                            console.log(self.selectedName())
                        }

                    });

                    console.log(self.pokemon())

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
        console.log(pokemon)
    };

    // Seleccionar un Pokemon y guardarlo en la session
    self.onMoveSelected = function (data, event) {

        console.log(self.selectedMove())

        if (self.selectedMoveTo()) {

            var moveName = self.selectedMoveTo() ? self.selectedMoveTo().move.name : '';
            self.selectedMove(moveName);

            // recupero el array original
            var arrayData = JSON.parse(localStorage.getItem('pokemons'));

            var miPokemonArr = self.pokemon();
            console.log(self.selectedMove())
            miPokemonArr[0].favMove = self.selectedMove();
            self.pokemon(miPokemonArr);
            self.selectedPokemon(miPokemonArr);
            console.log('actualizado', self.selectedPokemon())

            // actualizo pokemon del modal
            var selectedPokemonObj =
            {
                height: miPokemonArr[0].height,
                weight: miPokemonArr[0].weight,
                moves: miPokemonArr[0].moves,
                name: miPokemonArr[0].name,
                sprites: miPokemonArr[0].sprites,
                favMove: miPokemonArr[0].favMove
            }

            self.pokemon([selectedPokemonObj]);

            // lo recorro hasta coincidir con el name del pokemon
            arrayData.forEach(function (item) {
                if (item.name === miPokemonArr[0].name) {
                    item.favMove = self.selectedMoveTo().move.name;
                }
            });

            // Convertir el objeto a una cadena JSON
            var pokemonDataString = JSON.stringify(arrayData);

            //actulizamos el observable
            self.pokemons(arrayData);

            // Guardar el objeto en el localStorage
            localStorage.setItem('pokemons', JSON.stringify(arrayData));
        }
    };

    // Cargar los Pokémon al iniciar la página
    self.loadPokemons();
}

// Crea una instancia del ViewModel de Pokémon y aplica el binding de Knockout.js
var viewModel = new PokemonViewModel();
ko.applyBindings(viewModel);
