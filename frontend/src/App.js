// CSS
import "./App.css";

// Dependencias
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Dados
import Dados from "./data/db.json";

// Paginas
import Home from "./pages/Home";
import Empresas from "./pages/Empresas";
import Enderecos from "./pages/Enderecos";
import Pessoas from "./pages/Pessoas";

// Componentes
import Header from "./components/Header";
import Footer from "./components/Footer";
import Lista from "./components/Lista";

function App() {
  const [geradores] = useState(Dados.geradores);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="bloco">
          <Lista dados={geradores} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gerador_de_empresas" element={<Empresas />} />
            <Route path="/gerador_de_enderecos" element={<Enderecos />} />
            <Route path="/gerador_de_pessoas" element={<Pessoas />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
