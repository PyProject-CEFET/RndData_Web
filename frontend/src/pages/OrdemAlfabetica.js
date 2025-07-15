import { useState } from "react";

const OrdemAlfabetica = () => {
  const [txtButton, setTxtButton] = useState("Ordenar");
  const [statusButton, setStatusButton] = useState(false);
  const [error, setError] = useState(null);
  const [ordem, setOrdem] = useState("asc");
  const [por, setPor] = useState("quebra_linha");
  const [duplicado, setDuplicado] = useState(false);
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState("");
  const url = "http://localhost:5000/text/sort";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTxtButton("Aguarde...");
    setStatusButton(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: valor,
          order: ordem,
          by: por,
          remove_duplicates: duplicado,
        }),
      });
      const json = await res.json();
      setResultado(json.result || "Erro ao Ordenar");
    } catch (error) {
      setError("Falha! Recarregue a página.");
    }
    setTxtButton("Ordenar");
    setStatusButton(false);
  };

  return (
    <div className="pagina">
      <h1>Colocar em Ordem Alfabética</h1>
      <p>
        Ferramenta online para colocar uma lista em ordem alfabética.
        <br />
        Copie e cole a lista com os nomes que quer organizar alfabeticamente e
        depois clique em “Ordenar”.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="pontuacao">
          <label
            style={{
              display: "grid",
              gridTemplateColumns: "1.5em auto",
              gap: "0.2em",
            }}
          >
            <span style={{ gridColumn: "1 / span 2" }}>
              1. Tipo de ordenação:
            </span>
            <input
              type="radio"
              name="ordem"
              onClick={() => setOrdem("asc")}
              defaultChecked
            />
            <span>Ascendente (A-Z)</span>
            <input type="radio" name="ordem" onClick={() => setOrdem("desc")} />
            <span>Descendente (Z-A)</span>
          </label>
          <label
            style={{
              display: "grid",
              gridTemplateColumns: "1.5em auto",
              gap: "0.2em",
            }}
          >
            <span style={{ gridColumn: "1 / span 2" }}>2. Ordenar por:</span>
            <input
              type="radio"
              name="por"
              onClick={() => setPor("quebra_linha")}
              defaultChecked
            />
            <span>Quebra de Linha</span>
            <input type="radio" name="por" onClick={() => setPor("espaco")} />
            <span>Espaço</span>
            {/*<input type="radio" name="por" onClick={() => setPor("virgula")} />
            <span>Vírgula ( , )</span>
            <input
              type="radio"
              name="por"
              onClick={() => setPor("ponto_virgula")}
            />
            <span>Ponto e Vírgula ( ; )</span>*/}
          </label>
          <label
            style={{
              display: "grid",
              gridTemplateColumns: "1.5em auto",
              gap: "0.2em",
            }}
          >
            <span style={{ gridColumn: "1 / span 2" }}>
              3. Remover Duplicados?
            </span>
            <input
              type="checkbox"
              name="tipo"
              onClick={() => setDuplicado(!duplicado)}
            />
          </label>
        </div>
        {!error ? (
          <input
            className={txtButton === "Ordenar" ? "ativo" : "inativo"}
            type="submit"
            value={txtButton}
            disabled={statusButton}
          />
        ) : (
          <h2 style={{ marginTop: "50px", color: "red" }}>{error}</h2>
        )}
        <label
          className="forms"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5em",
            alignItems: "center",
          }}
        >
          <span>Digite o texto:</span>
          <textarea
            name="texto"
            id="texto"
            rows={6}
            cols={62}
            autoFocus
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            style={{
              resize: "none",
              fontSize: "1.2em",
              backgroundColor: "#E7FFE9",
            }}
          />
          <span>Resultado:</span>
          <textarea
            name="resultado"
            id="resultado"
            rows={6}
            cols={62}
            value={resultado}
            disabled
            style={{
              resize: "none",
              fontSize: "1.2em",
              backgroundColor: "#E7FFE9",
            }}
          />
        </label>
      </form>
    </div>
  );
};

export default OrdemAlfabetica;
