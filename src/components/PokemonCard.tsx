import type { PokemonListItem } from "../types/pokemon";
export default function PokemonCard({
  pokemon,
  openDetails,
}: {
  pokemon: PokemonListItem;
  openDetails: (id: string) => void;
}) {
  //Get image id from pokemon url
  const id = pokemon.url.split("/").filter(Boolean).pop() || "";
  //Note: The URL from the API response (pokemon.url) returns the API endpoint, not an image.
  //So I searched how to display Pokemon images and found that I should use PokeAPI's sprite repository.

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <button
      onClick={() => openDetails(id)}
      className="block p-3 sm:p-4 text-center bg-white rounded shadow hover:shadow-md transition cursor-pointer w-full"
    >
      <img
        src={imageUrl}
        alt={pokemon.name}
        loading="lazy"
        className="w-full h-24 sm:h-28 md:h-32 object-contain mb-2"
      />
      <div className="font-medium capitalize text-sm sm:text-base truncate">{pokemon.name}</div>
      <div className="text-xs text-gray-500">#{id}</div>
    </button>
  );
}
