interface Props {
  viewType: "pagination" | "infinite";
  setViewType: (t: "pagination" | "infinite") => void;
}

export default function ToggleView({ viewType, setViewType }: Props) {
  const type = viewType === "pagination" ? "Page Controls" : "Infinite Scroll";
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-2">Pokedex</h1>
      <p className="mb-4" id="view-description">
        Discover and explore pokemon with {type}
      </p>

      <div
        role="group"
        aria-labelledby="view-type-label"
        aria-describedby="view-description"
        className="inline-flex rounded-md p-1 gap-2"
      >
        <span id="view-type-label" className="sr-only">
          Choose view type
        </span>
        <button
          className={`px-3 py-1 rounded transition-colors cursor-pointer outline-none ${
            viewType === "pagination" ? "bg-black text-white" : "bg-white"
          }`}
          onClick={() => setViewType("pagination")}
          aria-pressed={viewType === "pagination"}
          aria-label="Use pagination view"
        >
          Page Controls
        </button>
        <button
          className={`px-3 py-1 rounded transition-colors cursor-pointer outline-none ${
            viewType === "infinite" ? "bg-black text-white" : "bg-white"
          }`}
          onClick={() => setViewType("infinite")}
          aria-pressed={viewType === "infinite"}
          aria-label="Use infinite scroll view"
        >
          Infinite Scroll
        </button>
      </div>
    </div>
  );
}
