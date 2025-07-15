import { useState } from "react";

const RemoverAcento = () => {
  const [txtButton, setTxtButton] = useState("Remover Acentos");
  const [statusButton, setStatusButton] = useState(false);
  const [error, setError] = useState(null);
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState("");
  const url = "http://localhost:5000/text/remove-accents";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTxtButton("Aguarde...");
    setStatusButton(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: valor }),
      });
      const json = await res.json();
      setResultado(json.result || "Erro ao converter");
    } catch (error) {
      setError("Falha! Recarregue a página.");
    }
    setTxtButton("Remover Acentos");
    setStatusButton(false);
  };

  return (
    <div className="pagina">
      <h1>Remover Acentos de um Texto</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "1em" }}>
        {!error ? (
          <input
            className={txtButton === "Remover Acentos" ? "ativo" : "inativo"}
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
          <span>Texto sem acentos:</span>
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

export default RemoverAcento;
