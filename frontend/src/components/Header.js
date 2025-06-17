import styles from "./Header.module.css";
import logo from "../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";

const Header = () => {
  const handleSubmit = (e) => {};

  return (
    <div className={styles.bloco}>
      <NavLink to="/" className={styles.logo}>
        <img
          src={logo}
          alt="RndData: Gerador de dados"
          title="RndData - Voltar para página inicial"
        />
      </NavLink>
      <div className={styles.bloco_botoes}>
        {/* <div className={styles.botoes}>
          <button>COMPUTAÇÃO</button>
          <button>MATEMÁTICA</button>
        </div> */}
        {/* <form onSubmit={handleSubmit}>
          <input type="text" name="buscar" placeholder="Buscar" />
          <button className={styles.lupa} type="submit">
            <SearchIcon sx={{ width: 20, height: 20, display: "block" }} />
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default Header;
