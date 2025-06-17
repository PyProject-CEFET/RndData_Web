import { useState } from "react";
import styles from "./Enderecos.module.css";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import lista from "../data/db.json";

const Enderecos = () => {
  const [dados, setDados] = useState({
    bairro: "",
    cep: "",
    cidade: "",
    estado: "",
    rua: "",
  });
  const [error, setError] = useState(null);
  const [campoCopiado, setCampoCopiado] = useState(null);
  const [txtButton, setTxtButton] = useState("Gerar Empresa");
  const [statusButton, setStatusButton] = useState(false);
  const [estados] = useState(lista.estados);
  const [estado, setEstado] = useState("none");
  const [quantidade, setQuantidade] = useState(1);
  const [json, setJson] = useState(null);
  const url =
    "http://localhost:5000/generate?type=address" +
    (estado !== "none" ? "&uf=" + estado : "") +
    "&quantity=" +
    quantidade;

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
      setTxtButton("Gerar Endereço");
      setStatusButton(false);
    };
    fetchDados();
  };

  return (
    <div className={styles.gerador}>
      <h1>Gerador de Endereços</h1>
      <p>
        Gerador online de ENDEREÇOS.
        <br />
        Geramos Estado, Cidade, Bairro, Rua e CEP.
        <br />
        Basta clicar no botão "Gerar Endereço".
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
            <span>Qual o Estado do endereço? </span>
            <select
              name="estado"
              onChange={(e) => setEstado(e.target.value)}
              style={{ fontSize: "1em", padding: "0.2em" }}
            >
              <option value="none">-- Aleatório --</option>
              {estados.map((item) => (
                <option value={item.value} key={item.id}>
                  {item.estado}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Gerar quantos Endereços? (Máx.: 100) </span>
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
              txtButton === "Gerar Endereço" ? styles.ativo : styles.inativo
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
            <label htmlFor="estado">Estado:</label>
            <input type="text" value={dados.estado} name="estado" disabled />
            <Tooltip
              title="Copiado"
              open={campoCopiado === "estado"}
              arrow
              placement="right"
            >
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(dados.estado);
                  handleCopiar("estado");
                }}
              >
                <ContentCopyIcon sx={{ fontSize: 15 }} />
              </button>
            </Tooltip>
            <label htmlFor="cidade">Cidade:</label>
            <input type="text" value={dados.cidade} name="cidade" disabled />
            <Tooltip
              title="Copiado"
              open={campoCopiado === "cidade"}
              arrow
              placement="right"
            >
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(dados.cidade);
                  handleCopiar("cidade");
                }}
              >
                <ContentCopyIcon sx={{ fontSize: 15 }} />
              </button>
            </Tooltip>
            <label htmlFor="bairro">Bairro:</label>
            <input type="text" value={dados.bairro} name="bairro" disabled />
            <Tooltip
              title="Copiado"
              open={campoCopiado === "bairro"}
              arrow
              placement="right"
            >
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(dados.bairro);
                  handleCopiar("bairro");
                }}
              >
                <ContentCopyIcon sx={{ fontSize: 15 }} />
              </button>
            </Tooltip>

            <label htmlFor="rua">Rua:</label>
            <input type="text" value={dados.rua} name="rua" disabled />
            <Tooltip
              title="Copiado"
              open={campoCopiado === "rua"}
              arrow
              placement="right"
            >
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(dados.rua);
                  handleCopiar("rua");
                }}
              >
                <ContentCopyIcon sx={{ fontSize: 15 }} />
              </button>
            </Tooltip>
            <label htmlFor="cep">CEP:</label>
            <input type="text" value={dados.cep} name="cep" disabled />
            <Tooltip
              title="Copiado"
              open={campoCopiado === "cep"}
              arrow
              placement="right"
            >
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(dados.cep);
                  handleCopiar("cep");
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
              value={json === null ? "" : JSON.stringify(json, null, 2)}
              disabled
            ></textarea>
          </div>
        )}
      </form>
      <p style={{ color: "#525252" }}>
        IMPORTANTE: Nosso gerador online de Endereços tem como intenção ajudar
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

export default Enderecos;
