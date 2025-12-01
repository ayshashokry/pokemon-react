import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonList from "../pages/PokemonList";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonList />} />
      </Routes>
    </BrowserRouter>
  );
}
