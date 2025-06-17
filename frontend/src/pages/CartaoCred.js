import { useState } from "react";
import styles from "./CartaoCred.module.css";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CartaoCred = () => {
  const [dados, setDados] = useState({
    bandeira: "",
    cvv: "",
    numero: "",
    titular: "",
    validade: "",
  });
  const [error, setError] = useState(null);
  const [campoCopiado, setCampoCopiado] = useState(null);
  const [txtButton, setTxtButton] = useState("Gerar Cartão");
  const [statusButton, setStatusButton] = useState(false);
  const [bandeira, setBandeira] = useState("none");
  const [quantidade, setQuantidade] = useState(1);
  const [json, setJson] = useState(null);
  const url =
    "http://localhost:5000/generate?type=credit_card" +
    (bandeira !== "none" ? "&bandeira=" + bandeira : "") +
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
      setTxtButton("Gerar Cartão");
      setStatusButton(false);
    };
    fetchDados();
  };

  const formatCartao = (numero) => {
    if (!numero) return "";
    return numero.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const formatCVV = (cvv) => {
    if (!cvv) return "";
    return cvv.toString().slice(0, 3);
  };

  const formatarJson = (arr) => {
    return arr.map((cartao) => ({
      ...cartao,
      cvv: formatCVV(cartao.cvv),
      numero: formatCartao(cartao.numero),
    }));
  };

  return (
    <div className={styles.gerador}>
      <h1>Gerador de Número de Cartão de Crédito</h1>
      <p>Gerador de números de Cartão de Crédito de várias bandeiras.</p>
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
            <span>Qual a Bandeira de Cartão de Crédito? </span>
            <select
              name="bandeira"
              onChange={(e) => setBandeira(e.target.value)}
              style={{ fontSize: "1em", padding: "0.2em" }}
            >
              <option value="none">-- Aleatório --</option>
              <option value="mastercard">MasterCard</option>
              <option value="visa">Visa</option>
              <option value="diners">Diners Club</option>
              <option value="discover">Discover</option>
              <option value="jcb">JCB</option>
            </select>
          </label>
          <label>
            <span>Gerar quantos Cartões? (Máx.: 100) </span>
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
              txtButton === "Gerar Cartão" ? styles.ativo : styles.inativo
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
            <label htmlFor="bandeira">Bandeira:</label>
            <input
              type="text"
              value={dados.bandeira}
              name="bandeira"
              disabled
            />
            <Tooltip
              title="Copiado"
              open={campoCopiado === "bandeira"}
              arrow
              placement="right"
            >
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(dados.bandeira);
                  handleCopiar("bandeira");
                }}
              >
                <ContentCopyIcon sx={{ fontSize: 15 }} />
              </button>
            </Tooltip>
            <label htmlFor="cartao">Cartão:</label>
            <input
              type="text"
              value={formatCartao(dados.numero)}
              name="cartao"
              disabled
            />
            <Tooltip
              title="Copiado"
              open={campoCopiado === "cartao"}
              arrow
              placement="right"
            >
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(formatCartao(dados.numero));
                  handleCopiar("cartao");
                }}
              >
                <ContentCopyIcon sx={{ fontSize: 15 }} />
              </button>
            </Tooltip>
            <label htmlFor="validade">Validade:</label>
            <input
              type="text"
              value={dados.validade}
              name="validade"
              disabled
            />
            <Tooltip
              title="Copiado"
              open={campoCopiado === "validade"}
              arrow
              placement="right"
            >
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(dados.validade);
                  handleCopiar("validade");
                }}
              >
                <ContentCopyIcon sx={{ fontSize: 15 }} />
              </button>
            </Tooltip>
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              value={formatCVV(dados.cvv)}
              name="cvv"
              disabled
            />
            <Tooltip
              title="Copiado"
              open={campoCopiado === "cvv"}
              arrow
              placement="right"
            >
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(formatCVV(dados.cvv));
                  handleCopiar("cvv");
                }}
              >
                <ContentCopyIcon sx={{ fontSize: 15 }} />
              </button>
            </Tooltip>
            <label htmlFor="titular">Titular:</label>
            <input type="text" value={dados.titular} name="titular" disabled />
            <Tooltip
              title="Copiado"
              open={campoCopiado === "titular"}
              arrow
              placement="right"
            >
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(dados.titular);
                  handleCopiar("titular");
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
                json === null ? "" : JSON.stringify(formatarJson(json), null, 2)
              }
              disabled
            ></textarea>
          </div>
        )}
      </form>
      <p style={{ color: "#525252" }}>
        IMPORTANTE: Nosso gerador online de Cartão de Crédito tem como intenção
        ajudar estudantes, programadores, analistas e testadores a gerar Cartões
        válidos. Normalmente necessários parar testar seus softwares em
        desenvolvimento. Esses dados não servem para fazer compras na internet.
        A má utilização dos dados aqui gerados é de total responsabilidade do
        usuário. Os números são gerados de forma aleatória, respeitando as
        regras de criação de cada documento.
      </p>
    </div>
  );
};

export default CartaoCred;
