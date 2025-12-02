import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import PokemonDetails from "../../pages/PokemonDetails";
import * as usePokemonHook from "../../hooks/usePokemon";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("PokemonDetails", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.clearAllMocks();
  });

  const renderWithRouter = (initialRoute = "/pokemon/25") => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it("renders loading state", () => {
    vi.spyOn(usePokemonHook, "usePokemon").mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: vi.fn(),
    } as any);

    const { container } = renderWithRouter();
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("renders error state with retry button", () => {
    const mockRefetch = vi.fn();
    vi.spyOn(usePokemonHook, "usePokemon").mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
    } as any);

    const { getByText } = renderWithRouter();
    expect(getByText("Failed to Load Pokemon Details")).toBeInTheDocument();
    expect(getByText("Retry")).toBeInTheDocument();
    expect(getByText("Go Back")).toBeInTheDocument();
  });

  it("renders pokemon details when data loaded", () => {
    vi.spyOn(usePokemonHook, "usePokemon").mockReturnValue({
      data: {
        name: "pikachu",
        height: 4,
        weight: 60,
        base_experience: 112,
        sprites: { front_default: "pikachu.png" },
        stats: [
          { stat: { name: "hp" }, base_stat: 35 },
          { stat: { name: "attack" }, base_stat: 55 },
        ],
        abilities: [
          {
            ability: { name: "static", url: "" },
            is_hidden: false,
            slot: 1,
          },
        ],
      },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    } as any);

    const { getByText } = renderWithRouter();
    expect(getByText("pikachu")).toBeInTheDocument();
    expect(getByText("4 m")).toBeInTheDocument();
    expect(getByText("60 Kg")).toBeInTheDocument();
    expect(getByText("112 XP")).toBeInTheDocument();
  });

  it("calls navigate when back button clicked", async () => {
    const user = userEvent.setup();
    vi.spyOn(usePokemonHook, "usePokemon").mockReturnValue({
      data: {
        name: "pikachu",
        height: 4,
        weight: 60,
        base_experience: 112,
        sprites: { front_default: "pikachu.png" },
        stats: [],
        abilities: [],
      },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    } as any);

    const { getByText } = renderWithRouter();
    await user.click(getByText("Back to list"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
