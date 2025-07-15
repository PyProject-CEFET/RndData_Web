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
        body: JSON.stringify({
          text: valor,
        }),
      });
      const json = await res.json();
      setResultado(json.result || "Erro ao converter");
    } catch (error) {
      setError("Falha! Recarregue a página.");
    }
    setTxtButton("Acentos Removidos");
    setStatusButton(false);
  };

  return (
    <div className="pagina">
      <h1>Removedor de Acentos</h1>
      <p>
        Ferramenta para remover acentuação de textos.
        <br />
        Digite o texto e removemos automaticamente sua acentuação.
      </p>
      <form onSubmit={handleSubmit}>
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
          <input
            type="text"
            name="value"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
          <span>Resposta:</span>
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

export default RemoverAcento;
