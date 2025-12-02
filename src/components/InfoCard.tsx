import type { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

export default function InfoCard({ icon: Icon, label, value }: InfoCardProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 flex-1 h-fit">
      <div className="flex items-center gap-2 mb-2 text-center justify-center">
        <Icon className="w-4 h-4 text-gray-600" />
        <p className="font-semibold text-sm text-gray-700">{label}</p>
      </div>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
