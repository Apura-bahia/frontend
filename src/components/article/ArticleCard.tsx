import { Link } from "react-router-dom";
import type Article from "../../interfaces/Article";
import { getArticleImage, getArticlePath } from "./articlePresentation";
import styles from "./ArticleCard.module.css";

interface ArticleCardProps {
    article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
    return (
        <article className={styles.card}>
            <span className={styles.category}>{article.categoria || "Notícias"}</span>
            <div className={styles.content}>
                <img
                    className={styles.image}
                    width="96"
                    height="96"
                    src={getArticleImage(article)}
                    alt=""
                    loading="lazy"
                />
                <Link to={getArticlePath(article)} className={styles.title} state={{noticia: article}} >
                    {article.titulo || "Notícia sem título"}
                </Link>
            </div>
        </article>
    );
};

export default ArticleCard;
