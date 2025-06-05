import styles from "./Card.module.css";
import { NavLink } from "react-router-dom";

const Card = ({ dados }) => {
  return (
    <div className={styles.grupo}>
      {dados.map((item) => (
        <NavLink to={`/${item.rota}`} key={item.id}>
          <div className={styles.box}>
            <div className={styles.quadro}>
              <img src={item.imagem} alt={item.titulo} title={item.titulo} />
            </div>
            <div className={styles.legenda}>
              <h4>{item.titulo}</h4>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Card;
