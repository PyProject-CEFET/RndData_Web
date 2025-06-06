import { useState } from "react";
import styles from "./Empresas.module.css";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Empresas = () => {
  const url = "http://192.168.1.8:5000/generate?type=company";
  const [dados, setDados] = useState({
    cnpj: "",
    email: "",
    razao_social: "",
    telefone: "",
  });
  const [error, setError] = useState(null);
  const [campoCopiado, setCampoCopiado] = useState(null);
  const [txtButton, setTxtButton] = useState("Gerar Empresa");
  const [statusButton, setStatusButton] = useState(false);
  const [opcao, setOpcao] = useState("sim");

  const handleCopiar = (nomeDoCampo) => {
    setCampoCopiado(nomeDoCampo);
    setTimeout(() => setCampoCopiado(null), 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchDados = async () => {
      setTxtButton("Aguarde...");
      setStatusButton(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setDados(json);
      } catch (error) {
        console.log(error.message);
        setError("Falha! Recarregue a página.");
      }
      setTxtButton("Gerar Empresa");
      setStatusButton(false);
    };
    fetchDados();
  };

  const formatCNPJ = (cnpj) => {
    if (!cnpj) return "";
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  };

  const formatTelefone = (telefone) => {
    if (!telefone) return "";
    return telefone.replace(/\D/g, "");
  };

  return (
    <div className={styles.gerador}>
      <h1>
        Gerador de documentos de empresas
        <br />
        (CNPJ, E-Mail, Razão Social e Telefone)
      </h1>
      <p>
        Gerador online dos documentos de uma EMPRESA.
        <br />
        Geramos CNPJ, E-Mail, Razão Social, e Telefone.
        <br />
        Basta clicar no botão "Gerar Empresa".
      </p>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ margin: "30px 6px 0" }}>Gerar com pontuação?</p>
          <div style={{ marginTop: "30px" }}>
            <label htmlFor="sim" style={{ marginRight: "6px" }}>
              <input
                type="radio"
                name="opcao"
                value={opcao}
                defaultChecked
                onClick={() => setOpcao("sim")}
              />
              Sim
            </label>
            <label htmlFor="nao">
              <input
                type="radio"
                name="opcao"
                value={opcao}
                onClick={() => setOpcao("nao")}
              />
              Não
            </label>
          </div>
        </div>
        {!error ? (
          <input
            className={
              txtButton === "Gerar Empresa" ? styles.ativo : styles.inativo
            }
            type="submit"
            value={txtButton}
            disabled={statusButton}
          />
        ) : (
          <h2 style={{ marginTop: "50px", color: "red" }}>{error}</h2>
        )}
        <div className={styles.forms}>
          <label htmlFor="cnpj">CNPJ:</label>
          <input
            type="text"
            value={opcao === "sim" ? formatCNPJ(dados.cnpj) : dados.cnpj}
            name="cnpj"
            disabled
          />
          <Tooltip
            title="Copiado"
            open={campoCopiado === "cnpj"}
            arrow
            placement="right"
          >
            <button
              type="button"
              onClick={() => {
                opcao === "sim"
                  ? navigator.clipboard.writeText(formatCNPJ(dados.cnpj))
                  : navigator.clipboard.writeText(dados.cnpj);
                handleCopiar("cnpj");
              }}
            >
              <ContentCopyIcon sx={{ fontSize: 15 }} />
            </button>
          </Tooltip>
          <label htmlFor="email">E-Mail:</label>
          <input type="email" value={dados.email} name="email" disabled />
          <Tooltip
            title="Copiado"
            open={campoCopiado === "email"}
            arrow
            placement="right"
          >
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(dados.email);
                handleCopiar("email");
              }}
            >
              <ContentCopyIcon sx={{ fontSize: 15 }} />
            </button>
          </Tooltip>
          <label htmlFor="razao_social">Razão Social:</label>
          <input
            type="text"
            value={dados.razao_social}
            name="razao_social"
            disabled
          />
          <Tooltip
            title="Copiado"
            open={campoCopiado === "razao_social"}
            arrow
            placement="right"
          >
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(dados.razao_social);
                handleCopiar("razao_social");
              }}
            >
              <ContentCopyIcon sx={{ fontSize: 15 }} />
            </button>
          </Tooltip>
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            value={
              opcao === "sim" ? dados.telefone : formatTelefone(dados.telefone)
            }
            name="telefone"
            disabled
          />
          <Tooltip
            title="Copiado"
            open={campoCopiado === "telefone"}
            arrow
            placement="right"
          >
            <button
              type="button"
              onClick={() => {
                opcao === "sim"
                  ? navigator.clipboard.writeText(dados.telefone)
                  : navigator.clipboard.writeText(
                      formatTelefone(dados.telefone)
                    );
                handleCopiar("telefone");
              }}
            >
              <ContentCopyIcon sx={{ fontSize: 15 }} />
            </button>
          </Tooltip>
        </div>
      </form>
      <p style={{ color: "#525252" }}>
        IMPORTANTE: Nosso gerador online de Empresas tem como intenção ajudar
        estudantes, programadores, analistas e testadores a gerar todos os
        documentos necessários para uma empresa, normalmente necessários para
        testar seus softwares em desenvolvimento.
        <br />A má utilização dos dados aqui gerados é de total responsabilidade
        do usuário.
        <br />
        Os números são gerados de forma aleatória, respeitando as regras de
        criação de cada documento.
      </p>
    </div>
  );
};

export default Empresas;
