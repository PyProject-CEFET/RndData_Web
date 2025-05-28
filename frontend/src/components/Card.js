import styles from "./Card.module.css";

const Card = ({ imagem, titulo }) => {
  return (
    <div className={styles.box}>
      <div className={styles.quadro}>
        <a href="/">
          <img src={imagem} alt={titulo} title={titulo} />
        </a>
      </div>
      <div className={styles.legenda}>
        <h4>{titulo}</h4>
      </div>
    </div>
  );
};

export default Card;
