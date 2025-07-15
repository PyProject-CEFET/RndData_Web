import { useState, useEffect } from "react";

const Sistema = () => {
  const [dados, setDados] = useState({});
  const [error, setError] = useState(null);
  const url = "http://localhost:5000/network/os";

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setDados(json);
      } catch {
        setError("Falha! Recarregue a página.");
      }
    };
    fetchDados();
  }, []);

  return (
    <div className="pagina">
      <h1>Meu Sistema Operacional</h1>
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
        <label>Sistema:</label>
        <input
          type="text"
          value={`${dados.system || ""} ${dados.release || ""}`.trim()}
          disabled
        />
      </div>
    </div>
  );
};

export default Sistema;
