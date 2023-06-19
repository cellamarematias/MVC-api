namespace PokemonKnockout.Models
{
    public class PokemonList
    {
        public string Count { get; set; }
        public string Next { get; set; }
        public string Previous { get; set; }
        public List<Pokemon> Results { get; set; }

    }
}
