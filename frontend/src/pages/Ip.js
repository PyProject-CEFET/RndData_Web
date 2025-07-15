import { useState, useEffect } from "react";
import campo from "../data/db.json";

const Ip = () => {
  const [dados, setDados] = useState({
    ip: "",
    reverse_dns: "",
  });
  const [error, setError] = useState(null);
  const url = "http://localhost:5000/network/ip";

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setDados(json);
      } catch (error) {
        console.log(error.message);
        setError("Falha! Recarregue a página.");
      }
    };
    fetchDados();
  }, []);

  return (
    <div className="pagina">
      <h1>Qual é o meu IP: descubra o seu endereço de IP rapidamente</h1>
      <p>
        <b>IP (Internet Protocol)</b> é um endereço único atribuído a cada
        dispositivo conectado à internet, permitindo a identificação e
        comunicação entre eles.
      </p>
      <div className="pontuacao"></div>
      {!error ? null : (
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
        {campo.ip.map((item) => (
          <>
            <label key={item.id} htmlFor={item.nome}>
              {item.campo}:
            </label>
            <input
              type={item.tipo}
              value={dados[item.value]}
              name={item.nome}
              disabled
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default Ip;
