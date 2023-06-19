using Newtonsoft.Json;

namespace PokemonKnockout.Models
{
    public class Pokemon
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }

        [JsonProperty("sprites")]
        public Sprites Sprites { get; set; }
        public string Weight { get; set; }
        public string Height { get; set; }
        public string FavMove { get; set; }

        [JsonProperty("moves")]
        public List<PokemonMove> Moves { get; set; }
    }

    public class Sprites
    {
        [JsonProperty("front_default")]
        public string FrontDefault { get; set; }
    }
}

