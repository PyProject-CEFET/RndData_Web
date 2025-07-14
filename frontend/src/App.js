// CSS
import "./App.css";

// Dependencias
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Dados
import Dados from "./data/db.json";

// Paginas
import Home from "./pages/Home";
import CartaoCred from "./pages/CartaoCred";
import Empresas from "./pages/Empresas";
import Enderecos from "./pages/Enderecos";
import Pessoas from "./pages/Pessoas";
import Renavam from "./pages/Renavam";
import Senhas from "./pages/Senhas";
import Sorteador from "./pages/Sorteador";

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
            <Route
              path="/gerador_de_numero_cartao_credito"
              element={<CartaoCred />}
            />
            <Route path="/gerador_de_empresas" element={<Empresas />} />
            <Route path="/gerador_de_enderecos" element={<Enderecos />} />
            <Route path="/gerador_de_pessoas" element={<Pessoas />} />
            <Route path="/gerador_de_renavam" element={<Renavam />} />
            <Route path="/gerador_de_senha" element={<Senhas />} />
            <Route path="/sorteador" element={<Sorteador />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
