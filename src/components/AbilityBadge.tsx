interface AbilityBadgeProps {
  name: string;
  isHidden: boolean;
}

export default function AbilityBadge({ name, isHidden }: AbilityBadgeProps) {
  const formattedName = name.replace("-", " ");

  return (
    <span
      className={`text-left px-3 py-2 rounded-4xl text-xs sm:text-sm capitalize font-medium w-fit my-3 ${
        isHidden
          ? "bg-gray-100 inline"
          : "bg-white block border border-gray-300"
      }`}
    >
      {formattedName}
      {isHidden && <span className="ml-1 text-xs">(Hidden)</span>}
    </span>
  );
}
