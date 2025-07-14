import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import campo from "../data/db.json";

const Sorteador = () => {
  const [dados, setDados] = useState("");
  const [error, setError] = useState(null);
  const [campoCopiado, setCampoCopiado] = useState(null);
  const [txtButton, setTxtButton] = useState("Sortear");
  const [statusButton, setStatusButton] = useState(false);
  const [quantidade, setQuantidade] = useState(1);
  const [minimo, setMinimo] = useState(0);
  const [maximo, setMaximo] = useState(10);
  const [json, setJson] = useState(null);
  const url =
    "http://localhost:5000/generate?type=number&minimo=" +
    minimo +
    "&maximo=" +
    maximo +
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
      setTxtButton("Sortear");
      setStatusButton(false);
    };
    fetchDados();
  };

  return (
    <div className="pagina">
      <h1>Sorteador de números aleatórios</h1>
      <p>
        Sorteador de números online e gratuito.
        <br />
        Selecione o intervalo e clique em sortear número.
        <br />
        Pode usar também para fazer sorteios no Facebook, Instagram e outras
        redes sociais.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="pontuacao">
          <label>
            <span>Sortear </span>
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
            <span> números entre </span>
            <input
              type="number"
              step="1"
              defaultValue={minimo}
              onChange={(e) => {
                setMinimo(Number(e.target.value));
                setDados("");
                setJson(null);
              }}
              pattern="\d*"
              min={0}
              max={maximo - 1}
              style={{ fontSize: "1em", width: "3em", padding: "0.2em" }}
            />
            <span> e </span>
            <input
              type="number"
              step="1"
              defaultValue={maximo}
              onChange={(e) => {
                setMaximo(Number(e.target.value));
                setDados("");
                setJson(null);
              }}
              pattern="\d*"
              min={minimo + 1}
              style={{ fontSize: "1em", width: "3em", padding: "0.2em" }}
            />
            <span> .</span>
          </label>
        </div>
        {!error ? (
          <input
            className={txtButton === "Sortear" ? "ativo" : "inativo"}
            type="submit"
            value={txtButton}
            disabled={statusButton}
          />
        ) : (
          <h2 style={{ marginTop: "50px", color: "red" }}>{error}</h2>
        )}
        {quantidade === 1 ? (
          <div className="forms">
            {campo.numeros.map((item) => (
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
      <p style={{ color: "#525252" }}>
        Sorteador de números online é uma ferramenta que gera números aleatórios
        dentro de um intervalo especificado. Ele é utilizado para diversas
        finalidades, como sorteios, loterias, brincadeiras, jogos, e qualquer
        outra situação que exija a seleção aleatória de números.
      </p>
    </div>
  );
};

export default Sorteador;
