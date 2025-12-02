interface PaginationInfoProps {
  page: number;
  totalPages: number;
  perPage: number;
}

export default function PaginationInfo({
  page,
  totalPages,
  perPage,
}: PaginationInfoProps) {
  return (
    <p className="text-sm text-gray-700">
      Page {page} of {totalPages} ({perPage} Pokemon shown)
    </p>
  );
}
