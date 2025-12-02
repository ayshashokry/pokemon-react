import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import AbilityBadge from "../AbilityBadge";

describe("AbilityBadge", () => {
  it("renders ability name", () => {
    const { getByText } = render(
      <AbilityBadge name="overgrow" isHidden={false} />
    );
    expect(getByText("overgrow")).toBeInTheDocument();
  });


  it("shows hidden label for hidden abilities", () => {
    const { getByText } = render(
      <AbilityBadge name="chlorophyll" isHidden={true} />
    );

    expect(getByText("(Hidden)")).toBeInTheDocument();
  });

  it("does not show hidden label for normal abilities", () => {
    const { queryByText } = render(
      <AbilityBadge name="overgrow" isHidden={false} />
    );

    expect(queryByText("(Hidden)")).not.toBeInTheDocument();
  });
});
