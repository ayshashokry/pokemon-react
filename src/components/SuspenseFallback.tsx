import Loading from "../layout/Loading";

interface SuspenseFallbackProps {
  message?: string;
}

export default function SuspenseFallback({ message = "Loading..." }: SuspenseFallbackProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loading />
      {message && (
        <p className="mt-4 text-gray-600 text-sm sm:text-base">{message}</p>
      )}
    </div>
  );
}
