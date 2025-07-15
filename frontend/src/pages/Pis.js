import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import campo from "../data/db.json";

const Pis = () => {
  const [dados, setDados] = useState("");
  const [error, setError] = useState(null);
  const [campoCopiado, setCampoCopiado] = useState(null);
  const [txtButton, setTxtButton] = useState("Gerar PIS");
  const [statusButton, setStatusButton] = useState(false);
  const [opcao, setOpcao] = useState("sim");
  const [quantidade, setQuantidade] = useState(1);
  const [json, setJson] = useState(null);
  const url = "http://localhost:5000/generate?type=pis&quantity=" + quantidade;

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
      setTxtButton("Gerar PIS");
      setStatusButton(false);
    };
    fetchDados();
  };

  const formatPIS = (pis) => {
    if (!pis) return "";
    return pis.replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, "$1.$2.$3-$4");
  };

  const formatarJsonPIS = (arr) => {
    return arr.map(formatPIS);
  };

  const format = {
    pis: formatPIS,
  };

  return (
    <div className="pagina">
      <h1>Gerador Online de PIS/PASEP Válido</h1>
      <p>
        Utilize nosso gerador de PIS/PASEP, basta clicar em "Gerar PIS" e
        pronto!
        <br />
        Um novo número de PIS válido será gerado.
        <br />
        Você ainda tem opção de colocar ou não os "pontos" entre os números.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="pontuacao">
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
            <span>Gerar quantos documentos? (Máx.: 100) </span>
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
            className={txtButton === "Gerar PIS" ? "ativo" : "inativo"}
            type="submit"
            value={txtButton}
            disabled={statusButton}
          />
        ) : (
          <h2 style={{ marginTop: "50px", color: "red" }}>{error}</h2>
        )}
        {quantidade === 1 ? (
          <div className="forms">
            {campo.pis.map((item) => (
              <>
                <label key={item.id} htmlFor={item.nome}>
                  {item.campo}:
                </label>
                <input
                  type={item.tipo}
                  value={opcao === "sim" ? format[item.nome](dados) : dados}
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
                      opcao === "sim"
                        ? navigator.clipboard.writeText(
                            format[item.nome](dados)
                          )
                        : navigator.clipboard.writeText(dados);
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
              value={
                json === null
                  ? ""
                  : JSON.stringify(
                      opcao === "sim" ? formatarJsonPIS(json) : json,
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
        IMPORTANTE: Nosso gerador online de PIS tem como intenção ajudar
        estudantes, programadores, analistas e testadores a gerar PIS válidos,
        normalmente necessários para testar seus softwares em desenvolvimento.
        <br />A má utilização dos dados aqui gerados é de total responsabilidade
        do usuário.
        <br />
        Os números são gerados de forma aleatória, respeitando as regras de
        criação de cada documento.
      </p>
    </div>
  );
};

export default Pis;
