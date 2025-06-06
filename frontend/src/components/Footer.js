import styles from "./Footer.module.css";
import Logo from "../assets/logo_2.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.bloco}>
      <NavLink to="/" className={styles.logo}>
        <img
          src={Logo}
          alt="RndData: Gerador de dados"
          title="RndData - Voltar para página inicial"
        />
      </NavLink>
      <span className={styles.frase}>
        {'# {" Facilitando a vida dos programadores ";}'}
      </span>
      <div className={styles.links}>
        <NavLink to="/">Fale Conosco</NavLink>
        <NavLink to="/">Privacidade</NavLink>
        <NavLink to="/">Termos de Uso</NavLink>
        <NavLink to="/">Sobre</NavLink>
      </div>
      <span className={styles.linha} />
      <p className={styles.ano}>2025</p>
    </div>
  );
};

export default Footer;
