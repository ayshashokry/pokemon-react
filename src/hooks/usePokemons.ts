import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import type { PokemonListResponse } from '../types/pokemon';

const fetchPokemonsPage = async (offset = 0, limit = 20) => {
  const res = await api.get<PokemonListResponse>('/pokemon', {
    params: { offset, limit },
  });
  return res.data;
};

export const usePokemonsPagination = (page: number, perPage = 20) => {
  const offset = (page - 1) * perPage;
  return useQuery({
queryKey: ['pokemons', page, perPage],
    queryFn: () => fetchPokemonsPage(offset, perPage),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60,
  });
};


export const usePokemonsInfinite = (perPage = 20) => {
  return useInfiniteQuery({
    queryKey: ['pokemons', 'infinite', perPage],
    queryFn: ({ pageParam = 0 }) => fetchPokemonsPage(pageParam, perPage),
    getNextPageParam: (last) => {
      if (!last.next) return undefined;
      const url = new URL(last.next);
      return Number(url.searchParams.get('offset') || 0);
    },
    initialPageParam: 0,
  });
};