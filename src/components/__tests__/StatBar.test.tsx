import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import StatBar from "../StatBar";

describe("StatBar", () => {
  it("renders stat name and value", () => {
    const { getByText } = render(
      <StatBar name="hp" value={45} />
    );

    expect(getByText("Hp")).toBeInTheDocument();
    expect(getByText("45")).toBeInTheDocument();
  });


});
