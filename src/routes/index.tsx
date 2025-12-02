import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuspenseFallback from "../components/SuspenseFallback";
import ErrorBoundary from "../components/ErrorBoundary";


const PokemonList = lazy(() => import("../pages/PokemonList"));
const PokemonDetails = lazy(() => import("../pages/PokemonDetails"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <Suspense fallback={<SuspenseFallback message="Loading Pokemon list..." />}>
                <PokemonList />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path="/pokemon/:id"
          element={
            <ErrorBoundary>
              <Suspense fallback={<SuspenseFallback message="Loading Pokemon details..." />}>
                <PokemonDetails />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
