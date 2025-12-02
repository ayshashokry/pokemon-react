import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import PokemonList from "../../pages/PokemonList";
import * as usePokemonsHook from "../../hooks/usePokemons";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children, to }: any) => <a href={to}>{children}</a>,
}));

describe("PokemonList", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.clearAllMocks();
  });

  const renderWithQuery = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <PokemonList />
      </QueryClientProvider>
    );
  };

  it("renders loading state initially", () => {
    vi.spyOn(usePokemonsHook, "usePokemonsPagination").mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: vi.fn(),
    } as any);

    const { container } = renderWithQuery();
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("renders pokemon list when data loaded", () => {
    vi.spyOn(usePokemonsHook, "usePokemonsPagination").mockReturnValue({
      data: {
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        ],
        next: "https://pokeapi.co/api/v2/pokemon?offset=20",
        previous: null,
        count: 1000,
      },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    } as any);

    const { getByText } = renderWithQuery();
    expect(getByText("bulbasaur")).toBeInTheDocument();
    expect(getByText("ivysaur")).toBeInTheDocument();
  });

  it("renders error state with retry button", () => {
    const mockRefetch = vi.fn();
    vi.spyOn(usePokemonsHook, "usePokemonsPagination").mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
    } as any);

    const { getByText } = renderWithQuery();
    expect(getByText("Failed to Load Pokemon")).toBeInTheDocument();
    expect(getByText("Retry")).toBeInTheDocument();
  });

  it("switches between pagination and infinite scroll modes", async () => {
    const user = userEvent.setup();
    vi.spyOn(usePokemonsHook, "usePokemonsPagination").mockReturnValue({
      data: {
        results: [],
        next: null,
        previous: null,
        count: 0,
      },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    } as any);

    const { getByRole } = renderWithQuery();
    const toggleButtons = getByRole("group").querySelectorAll("button");
    
    await user.click(toggleButtons[1]); 
  });
});
