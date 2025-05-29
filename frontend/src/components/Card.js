import styles from "./Card.module.css";

const Card = ({ imagem, titulo }) => {
  return (
    <a href="/">
      <div className={styles.box}>
        <div className={styles.quadro}>
          <img src={imagem} alt={titulo} title={titulo} />
        </div>
        <div className={styles.legenda}>
          <h4>{titulo}</h4>
        </div>
      </div>
    </a>
  );
};

export default Card;
