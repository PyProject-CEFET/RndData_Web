import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Lista from "./components/Lista";
import CPF from "./assets/cpf.jpg";
import Pessoas from "./assets/pessoas.jpg";
import Cartao_Cred from "./assets/cartao_cred.jpg";
import Letras from "./assets/letras.jpg";
import CNPJ from "./assets/cnpj.jpg";
import Corretor from "./assets/corretor.jpg";
import Card from "./components/Card";
import Footer from "./components/Footer";

function App() {
  const [geradores] = useState([
    { id: 1, tipo: "GERADORES" },
    { id: 2, tipo: "Gerador de Certidões" },
    { id: 3, tipo: "Gerador de CNH" },
    { id: 4, tipo: "Gerador de Conta Bancária" },
    { id: 5, tipo: "Gerador de CPF" },
    { id: 6, tipo: "Gerador de Currículo" },
    { id: 7, tipo: "Gerador de Letras diferentes" },
    { id: 8, tipo: "Gerador de Nicks" },
    { id: 9, tipo: "Gerador de Nomes" },
    { id: 10, tipo: "Gerador de Números Aleatórios" },
    { id: 11, tipo: "Gerador de PIS/PASEP" },
    { id: 12, tipo: "Gerador de RENAVAM" },
    { id: 13, tipo: "Gerador de Veículos" },
    { id: 14, tipo: "Gerador Placa de Veículos" },
    { id: 15, tipo: "Símbolos para Copiar" },
    { id: 16, tipo: "Gerador de CNPJ" },
    { id: 17, tipo: "Gerador de CEP" },
    { id: 18, tipo: "Gerador de RG" },
    { id: 19, tipo: "Gerador Inscrição Estadual" },
    { id: 20, tipo: "Gerador Título de Eleitor" },
    { id: 21, tipo: "Gerador Cartão de Crédito" },
    { id: 22, tipo: "Gerador de Pessoas" },
    { id: 23, tipo: "Gerador de Empresas" },
    { id: 24, tipo: "Gerador de Imagem" },
    { id: 25, tipo: "Gerador de Lorem Ipsum" },
    { id: 26, tipo: "Gerador de Senha" },
    { id: 27, tipo: "Gerador de números" },
  ]);

  const [validadores] = useState([
    { id: 1, tipo: "VALIDADORES" },
    { id: 2, tipo: "Validador Cartão de Crédito" },
    { id: 3, tipo: "Validador Conta Bancária" },
    { id: 4, tipo: "Validador de Certidões" },
    { id: 5, tipo: "Validador de CNH" },
    { id: 6, tipo: "Validador de CNPJ" },
    { id: 7, tipo: "Validador de CPF" },
    { id: 8, tipo: "Validador de PIS/PASEP" },
    { id: 9, tipo: "Validador de RENAVAM" },
    { id: 10, tipo: "Validador de RG" },
    { id: 11, tipo: "Validador Título de Eleitor" },
    { id: 12, tipo: "Validador Inscrição Estadual" },
  ]);

  return (
    <div className="App">
      <Header />
      <div className="corpo">
        <div>
          <Lista dados={geradores} />
          <Lista dados={validadores} />
        </div>
        <div>
          <h3>FERRAMENTAS POPULARES</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto",
              gap: 15,
              width: "fit-content",
              marginLeft: "15px",
            }}
          >
            <Card imagem={CPF} titulo="Gerador de Número de CPF" />
            <Card imagem={Pessoas} titulo="Gerador de Documentos de Pessoas" />
            <Card
              imagem={Cartao_Cred}
              titulo="Gerador de Número de Cartão de Crédito"
            />
            <Card imagem={Letras} titulo="Gerador de Letras diferentes" />
            <Card imagem={CNPJ} titulo="Gerador de CNPJ" />
            <Card imagem={Corretor} titulo="Corretor Ortográfico" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
