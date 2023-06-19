using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using PokemonKnockout.Models;

namespace PokemonKnockout.Views.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokemonController : ControllerBase
    {
        private HttpClient _httpClient;

        public PokemonController()
        {
            _httpClient = new HttpClient();
        }

        // GET: api/Pokemon
        [HttpGet]
        public async Task<IActionResult> GetPokemons()
        {
            var allPokemonsUrl = "https://pokeapi.co/api/v2/pokemon?limit=1000"; // URL para obtener todos los Pokémon (limit=1000 para obtener un máximo de 1000 Pokémon)
            var response = await _httpClient.GetAsync(allPokemonsUrl);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var pokemonList = JsonConvert.DeserializeObject<PokemonList>(content);
                if (pokemonList?.Results != null)
                {
                    for (int i = 0; i < pokemonList.Results.Count; i++)
                    {
                        pokemonList.Results[i].Id = i + 1;
                    }
                }
                return Ok(pokemonList?.Results);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Error al obtener los datos de la API de Pokémon.");
            }
        }

        // GET: api/Pokemon/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPokemonByID(int id)
        {
            var pokemonUrl = $"https://pokeapi.co/api/v2/pokemon/{id}";
            var response = await _httpClient.GetAsync(pokemonUrl);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var pokemonDetails = JsonConvert.DeserializeObject<Pokemon>(content);
                pokemonDetails.Id = id;
                return Ok(pokemonDetails);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Error al obtener los datos de la API de Pokémon.");
            }
        }


    }
}
