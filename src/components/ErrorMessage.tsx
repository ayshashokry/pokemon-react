import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  title: string;
  onRetry?: () => void;
  onGoBack?: () => void;
}

export default function ErrorMessage({
  title,
  onRetry,
  onGoBack,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-800 mb-1">
              {title}
            </h3>
            <div className="flex gap-2">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Retry
                </button>
              )}
              {onGoBack && (
                <button
                  onClick={onGoBack}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                >
                  Go Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
