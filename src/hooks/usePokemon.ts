import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import type { PokemonDetails } from "../types/pokemon";

export const fetchPokemon = async (id: string | number) => {
  const [res] = await Promise.all([
    api.get<PokemonDetails>(`/pokemon/${id}`),
    new Promise(resolve => setTimeout(resolve, 500)) 
  ]);
  return res.data;
};

export const usePokemon = (id: string | number) => {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => fetchPokemon(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id, 
  });
};
