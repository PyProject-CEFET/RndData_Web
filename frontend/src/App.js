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
import Pis from "./pages/Pis";
import Placa from "./pages/Placa";
import Renavam from "./pages/Renavam";
import Rg from "./pages/Rg";
import Senhas from "./pages/Senhas";
import Sorteador from "./pages/Sorteador";
import Titulo from "./pages/Titulo";
import Ip from "./pages/Ip";
import Navegador from "./pages/Navegador";
import Sistema from "./pages/Sistema";
import ValidaCartao from "./pages/ValidaCartao";
import ValidaCNPJ from "./pages/ValidaCNPJ";
import ValidaCPF from "./pages/ValidaCPF";
import ValidaPIS from "./pages/ValidaPIS";
import ValidaRENAVAM from "./pages/ValidaRENAVAM";
import ValidaRG from "./pages/ValidaRG";
import ValidaTitulo from "./pages/ValidaTitulo";
import ContaLetras from "./pages/ContaLetras";
import NumExtenso from "./pages/NumExtenso";

// Componentes
import Header from "./components/Header";
import Footer from "./components/Footer";
import Lista from "./components/Lista";

function App() {
  const [geradores] = useState(Dados.geradores);
  const [rede] = useState(Dados.rede);
  const [validadores] = useState(Dados.validadores);
  const [string] = useState(Dados.strings);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="bloco">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2em",
              marginBottom: "2em",
            }}
          >
            <Lista dados={geradores} />
            <Lista dados={validadores} />
            <Lista dados={string} />
            <Lista dados={rede} />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/gerador_de_numero_cartao_credito"
              element={<CartaoCred />}
            />
            <Route path="/gerador_de_empresas" element={<Empresas />} />
            <Route path="/gerador_de_enderecos" element={<Enderecos />} />
            <Route path="/gerador_de_pessoas" element={<Pessoas />} />
            <Route path="/gerador_de_pis_pasep" element={<Pis />} />
            <Route path="/gerador_de_placa_automoveis" element={<Placa />} />
            <Route path="/gerador_de_renavam" element={<Renavam />} />
            <Route path="/gerador_de_rg" element={<Rg />} />
            <Route path="/gerador_de_senha" element={<Senhas />} />
            <Route path="/sorteador" element={<Sorteador />} />
            <Route path="/gerador_de_titulo_de_eleitor" element={<Titulo />} />
            <Route
              path="/validador_numero_cartao_credito"
              element={<ValidaCartao />}
            />
            <Route path="/validador_cnpj" element={<ValidaCNPJ />} />
            <Route path="/validador_cpf" element={<ValidaCPF />} />
            <Route path="/validador_pis_pasep" element={<ValidaPIS />} />
            <Route path="/validador_de_renavam" element={<ValidaRENAVAM />} />
            <Route path="/validador_rg" element={<ValidaRG />} />
            <Route
              path="/validador_titulo_de_eleitor"
              element={<ValidaTitulo />}
            />
            <Route path="/meu_ip" element={<Ip />} />
            <Route path="/meu_navegador" element={<Navegador />} />
            <Route path="/meu_sistema_operacional" element={<Sistema />} />
            <Route path="/analisar_textos" element={<ContaLetras />} />
            <Route path="/numero_por_extenso" element={<NumExtenso />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
