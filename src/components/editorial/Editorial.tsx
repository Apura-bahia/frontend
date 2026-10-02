import { Link } from "react-router-dom";
import styles from "./Editorial.module.css";
import type Article from "../../interfaces/Article";

interface EditorialProps {
    articles: Article[];
    tituloSecao?: string;
    corFundo?: string;
    temaEscuro?: boolean; 
    linkCategoria?: string; // NOVO: Propriedade para o link do canto direito
}

const Editorial = ({ articles, tituloSecao, corFundo, temaEscuro = false, linkCategoria }: EditorialProps) => {
    if (!articles || articles.length === 0) return null;

    const mainArticle = articles[0];
    const secondaryArticles = articles.slice(1, 5);

    const getImagem = (art: any) => art.imagemDestaque || art.imagemCapa || art.featured_image || art.cover_image;
    const getTitulo = (art: any) => art.titulo || art.title || "Notícia em atualização";
    const getChapeu = (art: any) => art.chapeu || art.hat || art.categoria || art.category || "Notícias";

    const getTextoDestaque = (art: any) => {
        const sub = art.subtitulo || art.subtitle;
        if (sub) return sub;
        const cont = art.conteudo || art.content;
        return cont ? cont.substring(0, 180) + "..." : "";
    };

    const themeClass = temaEscuro ? styles.themeDark : styles.themeLight;

    return (
        <section 
            className={`${styles.section} ${themeClass}`}
            style={corFundo ? { backgroundColor: corFundo } : {}}
        >
            <div className={styles.divisor__margin}>
                
                {/* CABEÇALHO COM DIVIDER E LINK */}
                {tituloSecao && (
                    <div className={styles.heading}>
                        <span className={styles.eyebrow}>{tituloSecao}</span>
                        {/* O botão/link só aparece se você passar a propriedade linkCategoria */}
                        {linkCategoria && (
                            <Link to={linkCategoria} className={styles.heading__link}>
                                Mais notícias
                            </Link>
                        )}
                    </div>
                )}

                <div className={styles.divisor__contents}>
                    {/* DESTAQUE PRINCIPAL */}
                    {mainArticle && (
                        <Link to={`/noticia/${mainArticle.slug}`} state={{ noticia: mainArticle }} className={styles.divisor__contents__main} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <figure className={styles.divisor__content__img__wrapper}>
                                <img src={getImagem(mainArticle)} alt={getTitulo(mainArticle)} className={styles.divisor__contents__main__img} />
                            </figure>
                            <div>
                                <span className={styles.divisor__contents__main__kicker}>{getChapeu(mainArticle)}</span>
                                <h4 className={styles.divisor__contents__main__title}>{getTitulo(mainArticle)}</h4>
                                {getTextoDestaque(mainArticle) && <p>{getTextoDestaque(mainArticle)}</p>}
                            </div>
                        </Link>
                    )}

                    {/* GRID SECUNDÁRIO */}
                    <div className={styles.divisor__contents__second__grid}>
                        {secondaryArticles.map((article, index) => (
                            <Link to={`/noticia/${article.slug}`} state={{ noticia: article }} key={article.id || index} className={styles.card__editorial} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <figure className={styles.divisor__content__img__wrapper}>
                                    <img src={getImagem(article)} alt={getTitulo(article)} className={styles.divisor__contents__second__img} />
                                </figure>
                                <div>
                                    <span className={styles.divisor__contents__second__kicker}>{getChapeu(article)}</span>
                                    <h4 className={styles.divisor__contents__second__title}>{getTitulo(article)}</h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Editorial;