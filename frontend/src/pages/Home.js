import styles from "./Home.module.css";
import Card from "../components/Card";
import { useState } from "react";
import Dados from "../data/db.json";

const Home = () => {
  const [dados] = useState(Dados.cards);

  return (
    <div className={styles.cards}>
      <Card dados={dados} />
    </div>
  );
};

export default Home;
