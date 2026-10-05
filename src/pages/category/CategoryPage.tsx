import { useLoaderData, Link } from "react-router-dom";
import type Article from "../../interfaces/Article";
import styles from "./CategoryPage.module.css";
import editorialImgFallback from "../../assets/imgs/Futebol-da-Formacao-a-Competicao.jpg";

interface CategoryPageProps {
    category: string;
}

// Função para extrair apenas a hora da data de publicação (Ex: "11h46")
const formatarHora = (data?: string) => {
    if (!data) return "";
    const dateObj = new Date(data);
    if (Number.isNaN(dateObj.getTime())) return "";
    const horas = String(dateObj.getHours()).padStart(2, '0');
    const minutos = String(dateObj.getMinutes()).padStart(2, '0');
    return `${horas}h${minutos}`;
};

const CategoryPage = ({ category }: CategoryPageProps) => {
    const articles = useLoaderData() as Article[] | null | undefined;
    
    // Normalização para o filtro
    const normalizarCategoria = (valor?: string) => {
        if (!valor) return "";
        return String(valor).normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toUpperCase();
    };

    const catProcurada = normalizarCategoria(category);

    const categoryArticles = Array.isArray(articles) ? articles.filter((article: any) => {
        const catBanco = article.categoria || article.category || article.chapeu || "";
        return normalizarCategoria(catBanco) === catProcurada;
    }) : [];

    return (
        <main className={styles.page}>
            
            {/* BREADCRUMB LIMPO */}
            <nav className={styles.breadcrumb}>
                <Link to="/">Home</Link>
                <span className={styles.breadcrumb__separator}>&gt;</span>
                <span className={styles.breadcrumb__current}>{category}</span>
            </nav>

            {/* CABEÇALHO DA CATEGORIA */}
            <header className={styles.header}>
                <h1 className={styles.header__title}>{category}</h1>
                <p className={styles.header__description}>
                    Confira aqui as principais notícias sobre {category}: análises aprofundadas, tendências e informações relevantes.
                </p>
            </header>
            
            {/* LINHA DO TEMPO (TIMELINE) */}
            {categoryArticles.length > 0 ? (
                <div className={styles.timeline}>
                    {categoryArticles.map((article: any) => {
                        const titulo = article.titulo || article.title || "Notícia sem título";
                        const subtitulo = article.subtitulo || article.subtitle || "";
                        const chapeu = article.chapeu || article.hat || article.categoria || category;
                        const imagem = article.imagemDestaque || article.imagemCapa || article.featured_image || article.cover_image || editorialImgFallback;
                        const hora = formatarHora(article.dataPublicacao || article.date_created);

                        return (
                            <article key={article.id || article.slug} className={styles.timeline__item}>
                                
                                {/* Elementos visuais da Timeline */}
                                <div className={styles.timeline__time}>{hora}</div>
                                <div className={styles.timeline__dot}></div>

                                {/* Cartão da Notícia */}
                                <Link to={`/noticia/${article.slug}`} state={{ noticia: article }} className={styles.card}>
                                    <img src={imagem} alt={titulo} className={styles.card__image} />
                                    
                                    <div className={styles.card__content}>
                                        <span className={styles.card__kicker}>{chapeu}</span>
                                        <h2 className={styles.card__title}>{titulo}</h2>
                                        {subtitulo && <p className={styles.card__subtitle}>{subtitulo}</p>}
                                    </div>
                                </Link>

                            </article>
                        );
                    })}
                </div>
            ) : (
                <p className={styles.empty}>Nenhuma notícia encontrada nesta categoria.</p>
            )}
        </main>
    );
};

export default CategoryPage;