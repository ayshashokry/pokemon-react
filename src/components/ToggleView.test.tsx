import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToggleView from "./ToggleView";

describe("ToggleView", () => {
  it("renders both buttons and updates description based on viewType", () => {
    const mockSetViewType = vi.fn();
    const { getByText, rerender } = render(
      <ToggleView viewType="pagination" setViewType={mockSetViewType} />
    );

    expect(getByText("Pokedex")).toBeInTheDocument();
    expect(getByText("Page Controls")).toBeInTheDocument();
    expect(getByText("Infinite Scroll")).toBeInTheDocument();
    expect(getByText(/Discover and explore pokemon with Page Controls/)).toBeInTheDocument();

    rerender(<ToggleView viewType="infinite" setViewType={mockSetViewType} />);
    expect(getByText(/Discover and explore pokemon with Infinite Scroll/)).toBeInTheDocument();
  });

  it("calls setViewType when buttons are clicked", async () => {
    const user = userEvent.setup();
    const mockSetViewType = vi.fn();
    const { getByText } = render(
      <ToggleView viewType="pagination" setViewType={mockSetViewType} />
    );

    await user.click(getByText("Infinite Scroll"));
    expect(mockSetViewType).toHaveBeenCalledWith("infinite");

    await user.click(getByText("Page Controls"));
    expect(mockSetViewType).toHaveBeenCalledWith("pagination");
  });

  it("has proper accessibility attributes", () => {
    const mockSetViewType = vi.fn();
    const { getByLabelText } = render(
      <ToggleView viewType="pagination" setViewType={mockSetViewType} />
    );

    expect(getByLabelText("Use pagination view")).toHaveAttribute("aria-pressed", "true");
    expect(getByLabelText("Use infinite scroll view")).toHaveAttribute("aria-pressed", "false");
  });
});
