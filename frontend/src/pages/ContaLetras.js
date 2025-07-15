import { useState } from "react";

const ContaLetras = () => {
  const [caracteres, setCaracteres] = useState(0);
  const [caracteres_sem_espacos, setCaracteres_sem_espacos] = useState(0);
  const [palavras, setPalavras] = useState(0);
  const [espacos, setEspacos] = useState(0);
  const [linhas, setLinhas] = useState(0);
  const [vogais, setVogais] = useState(0);
  const [numeros, setNumeros] = useState(0);
  const [texto, setTexto] = useState("");
  const [txtButton, setTxtButton] = useState("Contar");
  const [statusButton, setStatusButton] = useState(false);
  const [error, setError] = useState(null);
  const url = "http://localhost:5000/text/stats";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTxtButton("Aguarde...");
    setStatusButton(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: texto }),
      });
      const json = await res.json();
      setCaracteres(json.caracteres);
      setCaracteres_sem_espacos(json.caracteres_sem_espacos);
      setPalavras(json.palavras);
      setEspacos(json.espacos);
      setLinhas(json.linhas);
      setVogais(json.vogais);
      setNumeros(json.numeros);
    } catch (error) {
      console.log(error.message);
      setError("Falha! Recarregue a página.");
    }
    setTxtButton("Contar");
    setStatusButton(false);
  };

  return (
    <div className="pagina">
      <h1>Contador de Caracteres, Palavras e Linhas</h1>
      <p>
        Ferramenta para contar caracteres, palavras, linhas, espaços, vogais e
        números.
        <br />
        Digite o texto e confira o resultado em baixo.
      </p>
      <form onSubmit={handleSubmit}>
        {!error ? (
          <input
            className={txtButton === "Contar" ? "ativo" : "inativo"}
            type="submit"
            value={txtButton}
            disabled={statusButton}
          />
        ) : (
          <h2 style={{ marginTop: "50px", color: "red" }}>{error}</h2>
        )}
        <label
          style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}
        >
          <span>Digite o texto:</span>
          <textarea
            name="texto"
            id="texto"
            rows={15}
            cols={62}
            autoFocus
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            style={{
              resize: "none",
              fontSize: "1.2em",
              backgroundColor: "#E7FFE9",
            }}
          />
        </label>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.5em",
            maxWidth: "36em",
            margin: "1em 0",
          }}
        >
          <span className="contador">
            Caracteres: <b>{caracteres}</b>
          </span>
          <span className="contador">
            Caracteres sem espaços: <b>{caracteres_sem_espacos}</b>
          </span>
          <span className="contador">
            Palavras: <b>{palavras}</b>
          </span>
          <span className="contador">
            Espaços: <b>{espacos}</b>
          </span>
          <span className="contador">
            Linhas: <b>{linhas}</b>
          </span>
          <span className="contador">
            Vogais: <b>{vogais}</b>
          </span>
          <span className="contador">
            Números: <b>{numeros}</b>
          </span>
        </div>
      </form>
    </div>
  );
};

export default ContaLetras;
