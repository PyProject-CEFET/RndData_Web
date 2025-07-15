import { useState } from "react";

const NumExtenso = () => {
  const [txtButton, setTxtButton] = useState("Calcular");
  const [statusButton, setStatusButton] = useState(false);
  const [error, setError] = useState(null);
  const [unidade, setUnidade] = useState("monetaria");
  const [tipo, setTipo] = useState("minuscula");
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState("");
  const url = "http://localhost:5000/text/number-to-words";

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
          value: Number(valor),
          type: unidade === "monetaria" ? "monetario" : "numero",
          case: tipo === "maiuscula" ? "maiusculo" : tipo,
          currency: "real",
        }),
      });
      const json = await res.json();
      setResultado(json.result || "Erro ao converter");
    } catch (error) {
      setError("Falha! Recarregue a página.");
    }
    setTxtButton("Calcular");
    setStatusButton(false);
  };

  return (
    <div className="pagina">
      <h1>Número por Extenso Online</h1>
      <p>
        Ferramenta para escrever números por extenso.
        <br />
        Digite o número ou o valor em reais e convertemos automaticamente para
        por extenso.
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
            <span style={{ gridColumn: "1 / span 2" }}>1. Qual a unidade?</span>
            <input
              type="radio"
              name="unidade"
              onClick={() => setUnidade("monetaria")}
              defaultChecked
            />
            <span>Monetária (Reais)</span>
            <input
              type="radio"
              name="unidade"
              onClick={() => setUnidade("numerica")}
            />
            <span>Numérica (Número Simples)</span>
          </label>
          <label
            style={{
              display: "grid",
              gridTemplateColumns: "1.5em auto",
              gap: "0.2em",
            }}
          >
            <span style={{ gridColumn: "1 / span 2" }}>2. Tipo de Letra?</span>
            <input
              type="radio"
              name="tipo"
              onClick={() => setTipo("minuscula")}
              defaultChecked
            />
            <span>minúsculas (Reais)</span>
            <input
              type="radio"
              name="tipo"
              onClick={() => setTipo("maiuscula")}
            />
            <span>MAIÚSCULAS</span>
            <input
              type="radio"
              name="tipo"
              onClick={() => setTipo("primeira")}
            />
            <span>Primeira Maiúscula</span>
          </label>
        </div>
        {!error ? (
          <input
            className={txtButton === "Calcular" ? "ativo" : "inativo"}
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
          <span>Digite o número:</span>
          <input
            type="text"
            name="value"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
          <span>Resposta por extenso:</span>
          <textarea
            name="resultado"
            id="resultado"
            rows={4}
            cols={44}
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

export default NumExtenso;
