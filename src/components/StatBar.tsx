interface StatBarProps {
  name: string;
  value: number;
  maxValue?: number;
}

export default function StatBar({ name, value, maxValue = 300 }: StatBarProps) {
  const percentage = (value / maxValue) * 100;
  const formattedName = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs sm:text-sm">
        <span className="font-medium text-gray-700 capitalize">
          {formattedName}
        </span>
        <span className="font-bold text-gray-900">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 bg-linear-to-r bg-black"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
