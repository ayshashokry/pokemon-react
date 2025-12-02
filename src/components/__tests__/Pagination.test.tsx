import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "../Pagination";

describe("Pagination", () => {
  const mockOnPageChange = vi.fn();

  it("renders current page and total pages", () => {
    const { getByText } = render(
      <Pagination
        page={1}
        total={100}
        perPage={20}
        next="https://pokeapi.co/api/v2/pokemon?offset=20"
        previous={null}
        onChange={mockOnPageChange}
      />
    );

    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    const { getByText } = render(
      <Pagination
        page={1}
        total={100}
        perPage={20}
        next="https://pokeapi.co/api/v2/pokemon?offset=20"
        previous={null}
        onChange={mockOnPageChange}
      />
    );

    const prevButton = getByText("Prev").closest("button");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    const { getAllByText } = render(
      <Pagination
        page={5}
        total={100}
        perPage={20}
        next={null}
        previous="https://pokeapi.co/api/v2/pokemon?offset=60"
        onChange={mockOnPageChange}
      />
    );

    const nextButtons = getAllByText("Next");
    const nextButton = nextButtons[0].closest("button");
    expect(nextButton).toBeDisabled();
  });

  it("calls onChange when clicking page number", async () => {
    const user = userEvent.setup();
    const { getByText } = render(
      <Pagination
        page={1}
        total={100}
        perPage={20}
        next="https://pokeapi.co/api/v2/pokemon?offset=20"
        previous={null}
        onChange={mockOnPageChange}
      />
    );

    await user.click(getByText("3"));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });
});
