import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Ruler } from "lucide-react";
import InfoCard from "../InfoCard";

describe("InfoCard", () => {
  it("renders label and value", () => {
    const { getByText } = render(
      <InfoCard icon={Ruler} label="Height" value="10 m" />
    );

    expect(getByText("Height")).toBeInTheDocument();
    expect(getByText("10 m")).toBeInTheDocument();
  });

  it("renders icon", () => {
    const { container } = render(
      <InfoCard icon={Ruler} label="Height" value="10 m" />
    );

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("handles numeric values", () => {
    const { getByText } = render(
      <InfoCard icon={Ruler} label="Weight" value={50} />
    );

    expect(getByText("50")).toBeInTheDocument();
  });
});
