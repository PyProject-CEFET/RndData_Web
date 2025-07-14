import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import campo from "../data/db.json";

const Pessoas = () => {
  const [dados, setDados] = useState({
    nome: "",
    cpf: "",
    data_nascimento: "",
    email: "",
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

  const format = {
    cpf: formatCPF,
    telefone: formatTelefone,
  };

  return (
    <div className="pagina">
      <h1>
        Gerador de documentos de pessoas
        <br />
        (Nome, CPF, Telefone, etc)
      </h1>
      <p>
        Gerador online dos documentos de uma PESSOA.
        <br />
        Geramos Nome, CPF, Nascimento, E-Mail e Telefone.
        <br />
        Basta clicar no botão "Gerar Pessoa".
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
            <span>Gerar quantas Pessoas? (Máx.: 100) </span>
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
            className={txtButton === "Gerar Pessoa" ? "ativo" : "inativo"}
            type="submit"
            value={txtButton}
            disabled={statusButton}
          />
        ) : (
          <h2 style={{ marginTop: "50px", color: "red" }}>{error}</h2>
        )}
        {quantidade === 1 ? (
          <div className="forms">
            {campo.pessoas.map((item) => (
              <>
                <label key={item.id} htmlFor={item.nome}>
                  {item.campo}:
                </label>
                <input
                  type={item.tipo}
                  value={
                    (opcao === "sim" &&
                      item.format === 1 &&
                      item.nome !== "telefone") ||
                    (opcao === "nao" &&
                      item.format === 1 &&
                      item.nome === "telefone")
                      ? format[item.nome](dados[item.value])
                      : dados[item.value]
                  }
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
                      (opcao === "sim" &&
                        item.format === 1 &&
                        item.nome !== "telefone") ||
                      (opcao === "nao" &&
                        item.format === 1 &&
                        item.nome === "telefone")
                        ? navigator.clipboard.writeText(
                            format[item.nome](dados[item.value])
                          )
                        : navigator.clipboard.writeText(dados[item.value]);
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

export default Pessoas;
