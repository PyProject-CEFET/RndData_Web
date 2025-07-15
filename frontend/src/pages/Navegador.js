import { useState, useEffect } from "react";
import { UAParser } from "ua-parser-js";

const Navegador = () => {
  const [dados, setDados] = useState({ user_agent: "" });
  const [navegador, setNavegador] = useState({ name: "", version: "" });
  const [error, setError] = useState(null);
  const url = "http://localhost:5000/network/browser";

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setDados(json);
      } catch (error) {
        setError("Falha! Recarregue a página.");
      }
    };
    fetchDados();
  }, []);

  useEffect(() => {
    if (dados.user_agent) {
      const parser = new UAParser(dados.user_agent);
      setNavegador(parser.getBrowser());
    }
  }, [dados.user_agent]);

  return (
    <div className="pagina">
      <h1>Meu Navegador</h1>
      {error && <h2 style={{ color: "red" }}>{error}</h2>}
      <div
        className="forms"
        style={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <label>Nome:</label>
        <input type="text" value={navegador.name || ""} disabled />
        <label>Versão:</label>
        <input type="text" value={navegador.version || ""} disabled />
      </div>
    </div>
  );
};

export default Navegador;
