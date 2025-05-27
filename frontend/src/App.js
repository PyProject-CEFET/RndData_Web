import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Lista from "./components/Lista";
import Cartao from "./components/Cartao";
import CPF from "./assets/cpf.jpg";
import Pessoas from "./assets/pessoas.jpg";
import Cartao_Cred from "./assets/cartao_cred.jpg";
import Letras from "./assets/letras.jpg";
import CNPJ from "./assets/cnpj.jpg";
import Corretor from "./assets/corretor.jpg";

function App() {
  const titulo_geradores = "GERADORES";
  const [geradores] = useState([
    { id: 1, tipo: "Gerador de Certidões" },
    { id: 2, tipo: "Gerador de CNH" },
    { id: 3, tipo: "Gerador de Conta Bancária" },
    { id: 4, tipo: "Gerador de CPF" },
    { id: 5, tipo: "Gerador de Currículo" },
    { id: 6, tipo: "Gerador de Letras diferentes" },
    { id: 7, tipo: "Gerador de Nicks" },
    { id: 8, tipo: "Gerador de Nomes" },
    { id: 9, tipo: "Gerador de Números Aleatórios" },
    { id: 10, tipo: "Gerador de PIS/PASEP" },
    { id: 11, tipo: "Gerador de RENAVAM" },
    { id: 12, tipo: "Gerador de Veículos" },
    { id: 13, tipo: "Gerador Placa de Veículos" },
    { id: 14, tipo: "Símbolos para Copiar" },
    { id: 15, tipo: "Gerador de CNPJ" },
    { id: 16, tipo: "Gerador de CEP" },
    { id: 17, tipo: "Gerador de RG" },
    { id: 18, tipo: "Gerador Inscrição Estadual" },
    { id: 19, tipo: "Gerador Título de Eleitor" },
    { id: 20, tipo: "Gerador Cartão de Crédito" },
    { id: 21, tipo: "Gerador de Pessoas" },
    { id: 22, tipo: "Gerador de Empresas" },
    { id: 23, tipo: "Gerador de Imagem" },
    { id: 24, tipo: "Gerador de Lorem Ipsum" },
    { id: 25, tipo: "Gerador de Senha" },
    { id: 26, tipo: "Gerador de números" },
  ]);

  const titulo_validadores = "VALIDADORES";
  const [validadores] = useState([
    { id: 1, tipo: "Validador Cartão de Crédito" },
    { id: 2, tipo: "Validador Conta Bancária" },
    { id: 3, tipo: "Validador de Certidões" },
    { id: 4, tipo: "Validador de CNH" },
    { id: 5, tipo: "Validador de CNPJ" },
    { id: 6, tipo: "Validador de CPF" },
    { id: 7, tipo: "Validador de PIS/PASEP" },
    { id: 8, tipo: "Validador de RENAVAM" },
    { id: 9, tipo: "Validador de RG" },
    { id: 10, tipo: "Validador Título de Eleitor" },
    { id: 11, tipo: "Validador Inscrição Estadual" },
  ]);

  return (
    <div className="App">
      <Header />
      <div className="corpo">
        <div>
          <Lista dados={geradores} titulo={titulo_geradores} />
          <Lista dados={validadores} titulo={titulo_validadores} />
        </div>
        <div>
          <h3>FERRAMENTAS POPULARES</h3>
          <div style={{display: "grid", gridTemplateColumns: "auto auto auto"}}>
            <Cartao imagem={CPF} titulo="Gerador de Número de CPF" />
            <Cartao imagem={Pessoas} titulo="Gerador de Documentos de Pessoas" />
            <Cartao imagem={Cartao_Cred} titulo="Gerador de Número de Cartão de Crédito" />
            <Cartao imagem={Letras} titulo="Gerador de Letras diferentes" />
            <Cartao imagem={CNPJ} titulo="Gerador de CNPJ" />
            <Cartao imagem={Corretor} titulo="Corretor Ortográfico" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
