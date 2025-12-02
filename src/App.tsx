import { Suspense } from "react";
import AppRouter from "./routes";
import ErrorBoundary from "./components/ErrorBoundary";
import SuspenseFallback from "./components/SuspenseFallback";

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<SuspenseFallback message="Loading application..." />}>
        <div className="min-h-screen w-full">
          <AppRouter />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
