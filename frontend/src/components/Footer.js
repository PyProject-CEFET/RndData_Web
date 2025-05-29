import styles from "./Footer.module.css";
import Logo from "../assets/logo_2.png";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.bloco}>
        <a href="/">
          <img
            src={Logo}
            alt="RndData: Gerador de dados"
            title="RndData - Voltar para página inicial"
          />
        </a>
        <div className={styles.linha_links}>
          <span>{'# {" Facilitando a vida dos programadores ";}'}</span>
          <div className={styles.links}>
            <a href="/">Fale Conosco</a>
            <a href="/">Privacidade</a>
            <a href="/">Termos de Uso</a>
            <a href="/">Sobre</a>
          </div>
        </div>
        <p>2025</p>
      </div>
    </div>
  );
};

export default Footer;
