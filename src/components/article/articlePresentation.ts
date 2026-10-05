import fallbackImage from "../../assets/imgs/Futebol-da-Formacao-a-Competicao.jpg";
import type Article from "../../interfaces/Article";

export const getArticlePath = (article: Article): string => {
    return article.slug ? `/noticia/${article.slug}` : `/noticia/${article.id ?? "indisponivel"}`;
};

export const getArticleImage = (article: Article): string => {
    return article.imagemCapa || article.imagemDestaque || fallbackImage;
};
