import { useEffect, useRef, useState } from "react";
import { getArticleImage } from "../article/articlePresentation";
import type Article from "../../interfaces/Article";
import styles from "./WebStory.module.css";

interface WebStoryProps {
    articles: Article[];
}

const WebStory = ({ articles }: WebStoryProps) => {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const previewRefs = useRef<Record<number, HTMLVideoElement | null>>({});

    useEffect(() => {
        if (!selectedArticle) {
            return;
        }

        const closeWithEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedArticle(null);
            }
        };

        document.addEventListener("keydown", closeWithEscape);
        return () => document.removeEventListener("keydown", closeWithEscape);
    }, [selectedArticle]);

    const playPreview = (articleId: number | undefined) => {
        if (articleId === undefined) {
            return;
        }
        void previewRefs.current[articleId]?.play().catch(() => undefined);
    };

    const stopPreview = (articleId: number | undefined) => {
        if (articleId === undefined) {
            return;
        }
        const video = previewRefs.current[articleId];
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    };

    if (articles.length === 0) {
        return null;
    }

    return (
        <section className={styles.section} aria-labelledby="webstories-title">
            <div className={styles.heading}>
                <span className={styles.eyebrow}>Agora</span>
                <h2 id="webstories-title">Web Stories</h2>
            </div>
            <div className={styles.track}>
                {articles.map((article) => (
                    <button
                        key={article.id}
                        type="button"
                        className={styles.card}
                        onClick={() => setSelectedArticle(article)}
                        onMouseEnter={() => playPreview(article.id)}
                        onMouseLeave={() => stopPreview(article.id)}
                        onFocus={() => playPreview(article.id)}
                        onBlur={() => stopPreview(article.id)}
                    >
                        {article.videoUrl ? (
                            <video
                                ref={(video) => {
                                    if (article.id !== undefined) {
                                        previewRefs.current[article.id] = video;
                                    }
                                }}
                                className={styles.media}
                                src={article.videoUrl}
                                poster={getArticleImage(article)}
                                muted
                                loop
                                playsInline
                                preload="metadata"
                            />
                        ) : (
                            <img className={styles.media} src={getArticleImage(article)} alt="" loading="lazy" />
                        )}
                        <span className={styles.scrim} />
                        <span className={styles.category}>{article.categoria || "Notícias"}</span>
                        <span className={styles.title}>{article.titulo || "Notícia sem título"}</span>
                        {article.videoUrl && <span className={styles.playIndicator}>▶</span>}
                    </button>
                ))}
            </div>

            {selectedArticle && (
                <div className={styles.overlay} role="presentation" onMouseDown={() => setSelectedArticle(null)}>
                    <div
                        className={styles.dialog}
                        role="dialog"
                        aria-modal="true"
                        aria-label={selectedArticle.titulo || "Web Story"}
                        onMouseDown={(event) => event.stopPropagation()}
                    >
                        <button type="button" className={styles.close} onClick={() => setSelectedArticle(null)} aria-label="Fechar Web Story">
                            ×
                        </button>
                        {selectedArticle.videoUrl ? (
                            <video
                                className={styles.expandedMedia}
                                src={selectedArticle.videoUrl}
                                poster={getArticleImage(selectedArticle)}
                                controls
                                autoPlay
                                playsInline
                            />
                        ) : (
                            <img
                                className={styles.expandedMedia}
                                src={getArticleImage(selectedArticle)}
                                alt={selectedArticle.titulo || "Imagem da notícia"}
                            />
                        )}
                        <div className={styles.caption}>
                            <span>{selectedArticle.categoria || "Notícias"}</span>
                            <h3>{selectedArticle.titulo || "Notícia sem título"}</h3>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default WebStory;
