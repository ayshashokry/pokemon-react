interface Props {
  viewType: "pagination" | "infinite";
  setViewType: (t: "pagination" | "infinite") => void;
}

export default function ToggleView({ viewType, setViewType }: Props) {
  const type = viewType === "pagination" ? "Page Controls" : "Infinite Scroll";
  return (
    <div className="text-center px-4 sm:px-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 pt-3">Pokedex</h1>
      <p className="mb-4 text-sm sm:text-base" id="view-description">
        Discover and explore pokemon with {type}
      </p>

      <div
        role="group"
        aria-labelledby="view-type-label"
        aria-describedby="view-description"
        className="inline-flex flex-col sm:flex-row rounded-md p-1 gap-2 w-full sm:w-auto max-w-sm mx-auto"
      >
        <span id="view-type-label" className="sr-only">
          Choose view type
        </span>
        <button
          className={`px-3 py-2 sm:py-1 rounded transition-colors cursor-pointer outline-none text-sm sm:text-base ${
            viewType === "pagination" ? "bg-black text-white" : "bg-white"
          }`}
          onClick={() => setViewType("pagination")}
          aria-pressed={viewType === "pagination"}
          aria-label="Use pagination view"
        >
          Page Controls
        </button>
        <button
          className={`px-3 py-2 sm:py-1 rounded transition-colors cursor-pointer outline-none text-sm sm:text-base ${
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
