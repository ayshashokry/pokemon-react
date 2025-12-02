import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import ToggleView from "../components/ToggleView";
import {
  usePokemonsInfinite,
  usePokemonsPagination,
} from "../hooks/usePokemons";
import Loading from "../layout/Loading";
import Pagination from "../components/Pagination";
import PokemonCard from "../components/PokemonCard";

interface Props {
  // Define props here
}

const PokemonList: React.FC<Props> = () => {
  const [viewType, setViewType] = useState<"pagination" | "infinite">(
    "pagination"
  );
  const perPage = 20;
  const [page, setPage] = useState(1);
  const paginated = usePokemonsPagination(page, perPage);
  const infinite = usePokemonsInfinite(perPage);
  const navigate = useNavigate();
  const lastFetchTime = useRef<number>(0);
  const minTimeBetweenFetches = 1000; 

  const openDetails = useCallback(
    (id: string) => {
      navigate(`/pokemon/${id}`);
    },
    [navigate]
  );

  const loadMore = useCallback(() => {
    const now = Date.now();
    const timeSinceLastFetch = now - lastFetchTime.current;

    if (
      infinite.hasNextPage &&
      !infinite.isFetchingNextPage &&
      timeSinceLastFetch >= minTimeBetweenFetches
    ) {
      lastFetchTime.current = now;
      infinite.fetchNextPage();
    }
  }, [infinite, minTimeBetweenFetches]);
  return (
    <div
      className={`${
        viewType === "pagination" ? "bg-blue-50" : "bg-green-50"
      } min-h-screen w-full`}
    >
      <ToggleView viewType={viewType} setViewType={setViewType} />

      {viewType === "pagination" && (
        <div className="mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 md:px-12 lg:px-20">
          {paginated.isLoading && (
            <div className="flex justify-center py-8">
              <Loading />
            </div>
          )}
          {paginated.isError && (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-red-800 mb-1">Failed to Load Pokemon</h3>
                    <p className="text-sm text-red-600 mb-4">
                      We couldn't fetch the Pokemon list. Please check your connection and try again.
                    </p>
                    <button
                      onClick={() => paginated.refetch()}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {paginated.isFetching && !paginated.isLoading && (
            <div className="flex justify-center py-4 mb-4">
              <div className="flex items-center gap-2">
                <Loading />
                <span className="text-sm text-gray-600">Loading page {page}...</span>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {paginated.data?.results.map((p) => (
              <PokemonCard key={p.name} pokemon={p} openDetails={openDetails} />
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Pagination
              page={page}
              total={paginated.data?.count || 0}
              perPage={perPage}
              next={paginated.data?.next || null}
              previous={paginated.data?.previous || null}
              onChange={setPage}
            />
          </div>
        </div>
      )}
      {viewType === "infinite" && (
        <div className="mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 md:px-12 lg:px-20">
          {infinite.isLoading && (
            <div className="flex justify-center py-8">
              <Loading />
            </div>
          )}
          {infinite.isError && (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-red-800 mb-1">Failed to Load Pokemon</h3>
                    <p className="text-sm text-red-600 mb-4">
                      We couldn't fetch the Pokemon list. Please check your connection and try again.
                    </p>
                    <button
                      onClick={() => infinite.refetch()}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {infinite.data?.pages
              .flatMap((p) => p.results)
              .map((p) => (
                <PokemonCard
                  key={p.name}
                  pokemon={p}
                  openDetails={openDetails}
                />
              ))}
          </div>

          <div className="mt-6 flex flex-col items-center gap-4 py-4">
            <p className="text-sm text-gray-700 text-center">
              Showing {infinite.data?.pages.flatMap((p) => p.results).length || 0} Pokemon
            </p>
            
            {infinite.hasNextPage && (
              <button
                onClick={loadMore}
                disabled={infinite.isFetchingNextPage}
                className="px-6 py-3 bg-black cursor-pointer text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
              >
                {infinite.isFetchingNextPage ? (
                  <span className="flex items-center gap-2">
                    <Loading />
                    Loading more pokemon...
                  </span>
                ) : (
                  "Load More"
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
