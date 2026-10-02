import { useLoaderData, useSearchParams } from "react-router-dom";
import ArticleCard from "../../components/article/ArticleCard";
import type Article from "../../interfaces/Article";
import styles from "./SearchPage.module.css";

const SearchPage = () => {
    const articles = useLoaderData() as Article[];
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q")?.trim() || "";
    const normalizedQuery = query.toLocaleLowerCase("pt-BR");
    const results = articles.filter((article) => {
        const searchableText = [article.titulo, article.subtitulo, article.conteudo, article.categoria]
            .filter(Boolean)
            .join(" ")
            .toLocaleLowerCase("pt-BR");

        return searchableText.includes(normalizedQuery);
    });

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <span className={styles.eyebrow}>Busca</span>
                <h1>{query ? `Resultados para “${query}”` : "Digite um termo para buscar"}</h1>
            </header>
            {query && results.length > 0 ? (
                <ul className={styles.list}>
                    {results.map((article) => (
                        <li key={article.id}>
                            <ArticleCard article={article} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.empty}>
                    {query ? "Nenhuma notícia encontrada." : "Informe um termo de busca."}
                </p>
            )}
        </main>
    );
};

export default SearchPage;
