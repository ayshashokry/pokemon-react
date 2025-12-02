import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import PokemonCard from "../PokemonCard";
import type { PokemonListItem } from "../../types/pokemon";

describe("PokemonCard", () => {
  const mockPokemon: PokemonListItem = {
    name: "pikachu",
    url: "https://pokeapi.co/api/v2/pokemon/25/",
  };
  const mockOpenDetails = vi.fn();


  it("renders pokemon name and image", () => {
    const { getByText, getByAltText } = render(
      <PokemonCard pokemon={mockPokemon} openDetails={mockOpenDetails} />
    );

    expect(getByText("pikachu")).toBeInTheDocument();
    expect(getByAltText("pikachu")).toBeInTheDocument();
  });

  it("extracts correct ID from URL", () => {
    const { getByAltText } = render(<PokemonCard pokemon={mockPokemon} openDetails={mockOpenDetails} />);

    const img = getByAltText("pikachu") as HTMLImageElement;
    expect(img.src).toContain("/25.png");
  });


});
