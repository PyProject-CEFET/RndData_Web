import { useState } from "react";

const MaiMin = () => {
  const [txtButton, setTxtButton] = useState("Converter");
  const [statusButton, setStatusButton] = useState(false);
  const [error, setError] = useState(null);
  const [tipo, setTipo] = useState("maiuscula");
  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState("");
  const url = "http://localhost:5000/text/case";

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
          type: tipo,
          ignore_shorter_than: 0,
          ignore_words: [],
        }),
      });
      const json = await res.json();
      setResultado(json.result || "Erro ao converter");
    } catch (error) {
      setError("Falha! Recarregue a página.");
    }
    setTxtButton("Converter");
    setStatusButton(false);
  };

  return (
    <div className="pagina">
      <h1>Converter Maiúsculas e Minúsculas</h1>
      <p>
        Transformar textos para maiúsculas ou para minúsculas?
        <br />
        Basta usar nossa ferramenta.
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
              Escolha o tipo de conversão:
            </span>
            <input
              type="radio"
              name="tipo"
              onClick={() => setTipo("maiuscula")}
              defaultChecked
            />
            <span>MAIÚSCULO</span>
            <input
              type="radio"
              name="tipo"
              onClick={() => setTipo("minuscula")}
            />
            <span>minúsculo</span>
            <input
              type="radio"
              name="tipo"
              onClick={() => setTipo("inverter")}
            />
            <span>Inverter Texto</span>
            <input
              type="radio"
              name="tipo"
              onClick={() => setTipo("alternado")}
            />
            <span>AlTeRnAdO</span>
            <input
              type="radio"
              name="tipo"
              onClick={() => setTipo("primeira_palavra")}
            />
            <span>Primeira palavra frase</span>
            <input
              type="radio"
              name="tipo"
              onClick={() => setTipo("primeira_letra_palavra")}
            />
            <span>Primeira Letra Palavra</span>
          </label>
        </div>
        {!error ? (
          <input
            className={txtButton === "Converter" ? "ativo" : "inativo"}
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

export default MaiMin;
