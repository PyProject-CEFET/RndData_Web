import styles from "./Lista.module.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Lista = ({ dados }) => {
  return (
    <div>
      <ul>
        {dados.map((item) => (
          <li key={item.id}>
            <a href="/">
              {item.tipo}
              <ChevronRightIcon className={styles.seta} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lista;
