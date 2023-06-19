using Newtonsoft.Json;

namespace PokemonKnockout.Models
{
    public class PokemonMove
    {
        [JsonProperty("move")]
        public MoveData Move { get; set; }
    }

    public class MoveData
    {
        public string Name { get; set; }
        public string Url { get; set; }
    }
}
