import { useState } from "react";
import styles from "./Pessoas.module.css";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Pessoas = () => {
  const [dados, setDados] = useState({
    cpf: "",
    data_nascimento: "",
    email: "",
    nome: "",
    telefone: "",
  });
  const [error, setError] = useState(null);
  const [campoCopiado, setCampoCopiado] = useState(null);
  const [txtButton, setTxtButton] = useState("Gerar Pessoa");
  const [statusButton, setStatusButton] = useState(false);
  const [opcao, setOpcao] = useState("sim");
  const [quantidade, setQuantidade] = useState(1);
  const [json, setJson] = useState(null);
  const url =
    "http://localhost:5000/generate?type=person&quantity=" + quantidade;

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
        quantidade === 1 ? setDados(json[0]) : setJson(json);
      } catch (error) {
        console.log(error.message);
        setError("Falha! Recarregue a página.");
      }
      setTxtButton("Gerar Pessoa");
      setStatusButton(false);
    };
    fetchDados();
  };

  const formatCPF = (cpf) => {
    if (!cpf) return "";
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatTelefone = (telefone) => {
    if (!telefone) return "";
    return telefone.replace(/\D/g, "");
  };

  const formatarJsonCPF = (arr) => {
    return arr.map((pessoa) => ({
      ...pessoa,
      cpf: formatCPF(pessoa.cpf),
    }));
  };

  const formatarJsonTelefone = (arr) => {
    return arr.map((pessoa) => ({
      ...pessoa,
      telefone: formatTelefone(pessoa.telefone),
    }));
  };

  return (
    <div className={styles.gerador}>
      <h1>
        Gerador de documentos de pessoas
        <br />
        (CPF, Nascimento, E-mail, Nome e Telefone)
      </h1>
      <p>
        Gerador online dos documentos de uma PESSOA.
        <br />
        Geramos CPF, Nascimento, E-mail, Nome e Telefone.
        <br />
        Basta clicar no botão "Gerar Pessoa".
      </p>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5em",
            marginTop: "1em",
            marginLeft: "1em",
            alignSelf: "flex-start",
          }}
        >
          <label>
            <span>Gerar com pontuação?</span>
            <input
              type="radio"
              name="opcao"
              value={opcao}
              defaultChecked
              onClick={() => setOpcao("sim")}
            />
            <span>Sim</span>
            <input
              type="radio"
              name="opcao"
              value={opcao}
              onClick={() => setOpcao("nao")}
            />
            <span>Não</span>
          </label>
          <label>
            <span>Gerar quantas Empresas? (Máx.: 100) </span>
            <input
              type="number"
              step="1"
              defaultValue={quantidade}
              onChange={(e) => {
                setQuantidade(Number(e.target.value));
                setDados("");
                setJson(null);
              }}
              pattern="\d*"
              min={1}
              max={100}
              style={{ fontSize: "1em", width: "3em", padding: "0.2em" }}
            />
          </label>
        </div>
        {!error ? (
          <input
            className={
              txtButton === "Gerar Pessoa" ? styles.ativo : styles.inativo
            }
            type="submit"
            value={txtButton}
            disabled={statusButton}
          />
        ) : (
          <h2 style={{ marginTop: "50px", color: "red" }}>{error}</h2>
        )}
        {quantidade === 1 ? (
          <div className={styles.forms}>
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              value={opcao === "sim" ? formatCPF(dados.cpf) : dados.cpf}
              name="cpf"
              disabled
            />
            <Tooltip
              title="Copiado"
              open={campoCopiado === "cpf"}
              arrow
              placement="right"
            >
              <button
                type="button"
                onClick={() => {
                  opcao === "sim"
                    ? navigator.clipboard.writeText(formatCPF(dados.cpf))
                    : navigator.clipboard.writeText(dados.cpf);
                  handleCopiar("cpf");
                }}
              >
                <ContentCopyIcon sx={{ fontSize: 15 }} />
              </button>
            </Tooltip>
            <label htmlFor="nascimento">Nascimento:</label>
            <input
              type="text"
              value={dados.data_nascimento}
              name="nascimento"
              disabled
            />
            <Tooltip
              title="Copiado"
              open={campoCopiado === "nascimento"}
              arrow
              placement="right"
            >
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(dados.data_nascimento);
                  handleCopiar("nascimento");
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
            <label htmlFor="nome">Nome:</label>
            <input type="text" value={dados.nome} name="nome" disabled />
            <Tooltip
              title="Copiado"
              open={campoCopiado === "nome"}
              arrow
              placement="right"
            >
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(dados.nome);
                  handleCopiar("nome");
                }}
              >
                <ContentCopyIcon sx={{ fontSize: 15 }} />
              </button>
            </Tooltip>
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="text"
              value={
                opcao === "sim"
                  ? dados.telefone
                  : formatTelefone(dados.telefone)
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
        ) : (
          <div>
            <h4 style={{ color: "#737373" }}>Resposta JSON:</h4>
            <textarea
              name="retorno"
              style={{
                width: "560px",
                minHeight: "280px",
                resize: "vertical",
                marginBottom: "1em",
                backgroundColor: "#EAF9FF",
                fontSize: "1.2em",
                padding: "0.5em",
              }}
              value={
                json === null
                  ? ""
                  : JSON.stringify(
                      opcao === "sim"
                        ? formatarJsonCPF(json)
                        : formatarJsonTelefone(json),
                      null,
                      2
                    )
              }
              disabled
            ></textarea>
          </div>
        )}
      </form>
      <p style={{ color: "#525252" }}>
        IMPORTANTE: Nosso gerador online de Pessoas tem como intenção ajudar
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

export default Pessoas;
