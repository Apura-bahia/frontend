import styles from "./Footer.module.css";

const Footer = () => {
    return <footer className={styles.container__footer}>
        <p>&copy; Apura Bahia. Todos os direitos reservados.</p>
        <nav className={styles.nav__footer}>
            <span>Início</span>
            <span>Sobre Nós</span>
            <span>Contato</span>
        </nav>
    </footer>
}

export default Footer;
