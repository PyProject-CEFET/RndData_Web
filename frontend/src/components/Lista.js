import styles from "./Lista.module.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NavLink } from "react-router-dom";

const Lista = ({ dados }) => {
  return (
    <div className={styles.lista}>
      <ul>
        {dados.map((item) => (
          <li key={item.id}>
            <NavLink
              to={`/${item.rota}`}
              className={({ isActive }) => (isActive ? styles.ativo : "")}
            >
              {item.tipo}
              <ChevronRightIcon className={styles.seta} />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lista;
