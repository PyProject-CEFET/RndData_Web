import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import campo from "../data/db.json";

const Senhas = () => {
  const [dados, setDados] = useState("");
  const [error, setError] = useState(null);
  const [campoCopiado, setCampoCopiado] = useState(null);
  const [txtButton, setTxtButton] = useState("Gerar Senha");
  const [statusButton, setStatusButton] = useState(false);
  const [tamanho, setTamanho] = useState(10);
  const [maiusculas, setMaiusculas] = useState(true);
  const [minusculas, setMinusculas] = useState(true);
  const [numeros, setNumeros] = useState(true);
  const [caracteres, setCaracteres] = useState(false);
  const [quantidade, setQuantidade] = useState(1);
  const [json, setJson] = useState(null);
  const url =
    "http://localhost:5000/generate?type=password&passwordTamanho=" + tamanho
    + "&quantity=" + quantidade
    + "&passwordMaiuscula=" + maiusculas
    + "&passwordMinuscula=" + minusculas
    + "&passwordNumeros=" + numeros
    + "&passwordEspeciais=" + caracteres
    + "&quantity=" + quantidade;

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
      setTxtButton("Gerar Senha");
      setStatusButton(false);
    };
    fetchDados();
  };

  return (
    <div className="pagina">
      <h1>Gerador de Senhas</h1>
      <p>
        Ferramenta online para gerar senhas fortes e seguras.
        <br />
        O gerador de senhas permite criar uma senha aleatória com diversas
        opções.
        <br />
        Selecione as opções desejadas, clique em "Gerar Senha" e confira a senha
        gerada abaixo do botão.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="pontuacao">
          <label>
            <span>Tamanho da Senha (Máx.: 32): </span>
            <input
              type="number"
              step="1"
              defaultValue={tamanho}
              onChange={(e) => {
                setTamanho(Number(e.target.value));
                setDados("");
                setJson(null);
              }}
              pattern="\d*"
              min={4}
              max={32}
              style={{ fontSize: "1em", width: "3em", padding: "0.2em" }}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={maiusculas}
              onClick={() => setMaiusculas(!maiusculas)}
            />
            <span>Incluir Letras Maiúsculas</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={minusculas}
              onClick={() => setMinusculas(!minusculas)}
            />
            <span>Incluir Letras Minúsculas</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={numeros}
              onClick={() => setNumeros(!numeros)}
            />
            <span>Incluir Números</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={caracteres}
              onClick={() => setCaracteres(!caracteres)}
            />
            <span>
              Incluir Caracteres Especiais
              (!@#$%&amp;*()-+.,;?&#123;[&#125;]^&gt;&lt;:)
            </span>
          </label>
          <label>
            <span>Número de Senhas Geradas (Máx.: 100): </span>
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
            className={txtButton === "Gerar Senha" ? "ativo" : "inativo"}
            type="submit"
            value={txtButton}
            disabled={statusButton}
          />
        ) : (
          <h2 style={{ marginTop: "50px", color: "red" }}>{error}</h2>
        )}
        {quantidade === 1 ? (
          <div className="forms">
            {campo.senhas.map((item) => (
              <>
                <label key={item.id} htmlFor={item.nome}>
                  {item.campo}:
                </label>
                <input
                  type={item.tipo}
                  value={dados}
                  name={item.nome}
                  disabled
                />
                <Tooltip
                  title="Copiado"
                  open={campoCopiado === item.nome}
                  arrow
                  placement="right"
                >
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(dados);
                      handleCopiar(item.nome);
                    }}
                  >
                    <ContentCopyIcon sx={{ fontSize: 15 }} />
                  </button>
                </Tooltip>
              </>
            ))}
          </div>
        ) : (
          <div>
            <h4 style={{ color: "#737373" }}>Resposta JSON:</h4>
            <textarea
              className="respJSON"
              name="retorno"
              value={json === null ? "" : JSON.stringify(json, null, 2)}
              disabled
            ></textarea>
          </div>
        )}
      </form>
    </div>
  );
};

export default Senhas;
