import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import lista from "../data/db.json";

const Enderecos = () => {
  const [dados, setDados] = useState({
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    cep: "",
  });
  const [error, setError] = useState(null);
  const [campoCopiado, setCampoCopiado] = useState(null);
  const [txtButton, setTxtButton] = useState("Gerar Endereço");
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
    <div className="pagina">
      <h1>
        Gerador de endereços
        <br />
        (Cidade, Bairro, CEP, etc)
      </h1>
      <p>
        Gerador online de ENDEREÇOS.
        <br />
        Geramos Estado, Cidade, Bairro, Rua e CEP.
        <br />
        Basta clicar no botão "Gerar Endereço".
      </p>
      <form onSubmit={handleSubmit}>
        <div className="pontuacao">
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
            className={txtButton === "Gerar Endereço" ? "ativo" : "inativo"}
            type="submit"
            value={txtButton}
            disabled={statusButton}
          />
        ) : (
          <h2 style={{ marginTop: "50px", color: "red" }}>{error}</h2>
        )}
        {quantidade === 1 ? (
          <div className="forms">
            {lista.enderecos.map((item) => (
              <>
                <label key={item.id} htmlFor={item.nome}>
                  {item.campo}:
                </label>
                <input
                  type={item.tipo}
                  value={dados[item.value]}
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
                      navigator.clipboard.writeText(dados[item.value]);
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
        IMPORTANTE: Nosso gerador online de Endereços tem como intenção ajudar
        estudantes, programadores, analistas e testadores a gerar documentos.
        Normalmente necessários parar testar seus softwares em desenvolvimento.
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
