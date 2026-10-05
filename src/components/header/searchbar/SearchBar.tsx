import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const SearchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17.2587 17.2593L21.2488 21.2494M11.25 5.74858C14.2883 5.74858 16.7513 8.21101 16.7513 11.2486M19.75 11.2486C19.75 15.9419 15.9444 19.7465 11.25 19.7465C6.55558 19.7465 2.75 15.9419 2.75 11.2486C2.75 6.55528 6.55558 2.75061 11.25 2.75061C15.9444 2.75061 19.75 6.55528 19.75 11.2486Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SearchBar = ({ isOpen, onOpen, onClose }: SearchBarProps) => {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const normalizedQuery = query.trim();

        if (!normalizedQuery) {
            inputRef.current?.focus();
            return;
        }

        navigate(`/busca?q=${encodeURIComponent(normalizedQuery)}`);
        onClose();
    };

    if (!isOpen) {
        return (
            <button type="button" className={styles.toggle} onClick={onOpen} aria-label="Abrir busca">
                <SearchIcon />
            </button>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit} role="search">
            <label className={styles.label} htmlFor="site-search">Buscar notícia</label>
            <input
                ref={inputRef}
                id="site-search"
                className={styles.input}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar notícia"
            />
            <button type="submit" className={styles.submit} aria-label="Pesquisar">
                <SearchIcon />
            </button>
            <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar busca">
                Fechar
            </button>
        </form>
    );
};

export default SearchBar;
