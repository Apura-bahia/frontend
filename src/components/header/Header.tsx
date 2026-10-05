import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchbar/SearchBar";
import styles from "./Header.module.css";
import logo from "../../assets/imgs/APURA BAHIA - MARCA - HORIZONTAL - SLOGAN - LARANJA.svg";
import { navigationItems } from "../../config/navigation";
import LineHeaderTop from "./lineheadertop/LineHeaderTop"; // Importa o nosso novo componente

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className={styles.header__container}>
            
            {/* INJETA A BARRA SUPERIOR AQUI */}
            <LineHeaderTop />

            {/* ÁREA DA LOGO */}
            <Link to="/">
                <div className={styles.header__container__second}>
                    <img width="512" height="192" alt="Logo Apura Bahia" src={logo} />
                </div>
            </Link>

            {/* BARRA DE NAVEGAÇÃO E MENU */}
            <nav className={styles.header__container__second__nav}>
                <div className={styles.nav__toolbar}>
                    <button
                        type="button"
                        className={styles.menu__toggle}
                        onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="main-navigation"
                        aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                    >
                        <span />
                        <span />
                        <span />
                    </button>

                    <SearchBar
                        isOpen={isSearchOpen}
                        onOpen={() => setIsSearchOpen(true)}
                        onClose={() => setIsSearchOpen(false)}
                    />
                </div>

                <ul
                    id="main-navigation"
                    className={`${styles.header__container__second__list} ${isMobileMenuOpen ? styles.is__open : ""} ${isSearchOpen ? styles.is__hidden : ""}`}
                >
                    {navigationItems
                        .filter((item) => item.showInHeader)
                        .map((item) => (
                            <li key={item.path}>
                                <Link to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;