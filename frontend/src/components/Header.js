import styles from "./Header.module.css";
import logo from "../assets/logo.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  return (
    <div className={styles.header}>
      <a href="/">
        <img
          src={logo}
          alt="RndData: Gerador de dados"
          title="RndData - Voltar para página inicial"
        />
      </a>
      <div>
        <Button variant="contained">Computação</Button>
        <Button variant="contained">Matemática</Button>
        <TextField
          id="outlined-basic"
          placeholder="Buscar"
          variant="outlined"
          sx={{
            "& .MuiInputBase-root": {
              background: "white",
              height: 37,
            },
          }}
        />
        <Button variant="contained">
          <SearchIcon />
        </Button>
      </div>
    </div>
  );
};

export default Header;
