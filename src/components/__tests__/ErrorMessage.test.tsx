import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorMessage from "../ErrorMessage";

describe("ErrorMessage", () => {
  it("renders error title", () => {
    const { getByText } = render(
      <ErrorMessage title="Something went wrong" />
    );

    expect(getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders retry button when onRetry provided", () => {
    const mockRetry = vi.fn();
    const { getByText } = render(
      <ErrorMessage title="Error" onRetry={mockRetry} />
    );

    expect(getByText("Retry")).toBeInTheDocument();
  });

  it("renders go back button when onGoBack provided", () => {
    const mockGoBack = vi.fn();
    const { getByText } = render(
      <ErrorMessage title="Error" onGoBack={mockGoBack} />
    );

    expect(getByText("Go Back")).toBeInTheDocument();
  });

  it("calls onRetry when retry button clicked", async () => {
    const user = userEvent.setup();
    const mockRetry = vi.fn();
    const { getByText } = render(
      <ErrorMessage title="Error" onRetry={mockRetry} />
    );

    await user.click(getByText("Retry"));
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it("calls onGoBack when go back button clicked", async () => {
    const user = userEvent.setup();
    const mockGoBack = vi.fn();
    const { getByText } = render(
      <ErrorMessage title="Error" onGoBack={mockGoBack} />
    );

    await user.click(getByText("Go Back"));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it("renders alert icon", () => {
    const { container } = render(<ErrorMessage title="Error" />);

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
