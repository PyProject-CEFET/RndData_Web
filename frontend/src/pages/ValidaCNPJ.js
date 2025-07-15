import { useState } from "react";

const ValidaCNPJ = () => {
  const [error, setError] = useState(null);
  const [txtButton, setTxtButton] = useState("Validar");
  const [statusButton, setStatusButton] = useState(false);
  const [resultado, setResultado] = useState("");
  const [valor, setValor] = useState("");
  const url = "http://localhost:5000/validator";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setStatusButton(true);
    setTxtButton("Validando...");
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "cnpj",
          value: valor.replace(/\D/g, ""),
        }),
      });
      const json = await res.json();
      setResultado(json.valido === true ? "Válido" : "Inválido");
    } catch {
      setError("Erro na validação.");
    }
    setStatusButton(false);
    setTxtButton("Validar");
  };

  return (
    <div className="pagina">
      <h1>Validador de CNPJ</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "1em" }}>
        {!error ? (
          <input
            className={txtButton === "Validar" ? "ativo" : "inativo"}
            type="submit"
            value={txtButton}
            disabled={statusButton}
          />
        ) : (
          <h2 style={{ marginTop: "50px", color: "red" }}>{error}</h2>
        )}
        <div
          className="forms"
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <label htmlFor="valor">Número do CNPJ:</label>
          <input
            type="text"
            name="valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
          <label htmlFor="resultado">Resultado:</label>
          <input type="text" name="resultado" value={resultado} disabled />
        </div>
      </form>
    </div>
  );
};

export default ValidaCNPJ;
