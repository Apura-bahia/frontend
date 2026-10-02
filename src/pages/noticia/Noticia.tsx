import { useLocation, useLoaderData, Link } from "react-router-dom";
import styles from './Noticia.module.css';
import type Article from "../../interfaces/Article";

interface NoticiaLocationState {
    noticia?: Article;
}

const formatarData = (data?: string) => {
    if (!data) return "Data não informada";
    const dataFormatada = new Date(data);
    if (Number.isNaN(dataFormatada.getTime())) return data;
    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(dataFormatada);
};

const Noticia = () => {
    const location = useLocation();
    const todasAsPostagens = useLoaderData() as Article[] | null | undefined;
    const noticiaBruta = (location.state as NoticiaLocationState | null)?.noticia;

    if (!noticiaBruta) {
        return (
            <main className={styles.page__container} style={{ textAlign: "center", padding: "4rem" }}>
                <h2>Notícia não encontrada.</h2>
                <Link to="/">Voltar à página inicial</Link>
            </main>
        );
    }

    const titulo = (noticiaBruta as any)?.titulo || (noticiaBruta as any)?.title || "Notícia não encontrada";
    
    // NOVA SEPARAÇÃO INTELIGENTE: Categoria (para o breadcrumb) vs Chapéu (para o destaque)
    // Tenta ler .categoria.nome caso o backend envie um objeto, ou apenas a string
    const categoriaPrincipal = (noticiaBruta as any)?.categoria?.nome || (noticiaBruta as any)?.categoria || (noticiaBruta as any)?.category || "Política";
    const chapeu = (noticiaBruta as any)?.chapeu || (noticiaBruta as any)?.hat || categoriaPrincipal;
    
    const subtitulo = (noticiaBruta as any)?.subtitulo || (noticiaBruta as any)?.subtitle || "";
    const conteudo = (noticiaBruta as any)?.conteudo || (noticiaBruta as any)?.content || "<p>Conteúdo indisponível.</p>";
    const dataPublicacao = (noticiaBruta as any)?.dataPublicacao || (noticiaBruta as any)?.date_created;
    
    const nomeAutor = (noticiaBruta as any)?.nomeAutor || (noticiaBruta as any)?.authorName || (noticiaBruta as any)?.autor?.nome || "Redação Apura";
    const fotoAutor = (noticiaBruta as any)?.fotoAutor || `https://ui-avatars.com/api/?name=${nomeAutor.replace(' ', '+')}&background=0A3622&color=fff`;
    
    const imagemCerta = (noticiaBruta as any)?.imagemDestaque || (noticiaBruta as any)?.imagemCapa || (noticiaBruta as any)?.featured_image || (noticiaBruta as any)?.cover_image;
    const legenda = (noticiaBruta as any)?.legendaImagem || "Imagem: Divulgação";

    const ultimasNoticias = todasAsPostagens 
        ? todasAsPostagens
            .filter((art: any) => art.titulo !== titulo && art.slug !== (noticiaBruta as any).slug)
            .reverse()
            .slice(0, 4)
        : [];

    return (
        <main className={styles.page__container}>
            
            {/* 1. BREADCRUMB (Agora limpo: apenas Home > Categoria) */}
            <nav className={styles.breadcrumb}>
                <Link to="/">Home</Link>
                <span className={styles.breadcrumb__separator}>&gt;</span>
                <Link to={`/${typeof categoriaPrincipal === 'string' ? categoriaPrincipal.toLowerCase() : ''}`}>
                    {categoriaPrincipal}
                </Link>
                {/* O título cortado que causava poluição visual foi removido daqui */}
            </nav>

            {/* 2. CABEÇALHO FULL-WIDTH */}
            <header className={styles.article__header}>
                <span className={styles.article__kicker}>{chapeu}</span>
                <h1 className={styles.article__title}>{titulo}</h1>
                {subtitulo && <h2 className={styles.article__subtitle}>{subtitulo}</h2>}

                <div className={styles.article__meta}>
                    <div className={styles.meta__author}>
                        <img src={fotoAutor} alt={`Avatar de ${nomeAutor}`} />
                        <span>Por {nomeAutor}</span>
                    </div>
                    <div className={styles.meta__date}>
                        <span>Publicado em {formatarData(dataPublicacao)}</span>
                    </div>
                </div>
            </header>

            {/* 3. GRID DE CONTEÚDO */}
            <article className={styles.article__grid}>
                
                <div className={styles.article__main}>
                    <figure className={styles.article__image__wrapper}>
                        {imagemCerta && (
                            <img src={imagemCerta} alt={titulo} className={styles.article__image} />
                        )}
                        <figcaption className={styles.article__caption}>{legenda}</figcaption>
                    </figure>

                    <div className={styles.article__body}>
                        <div dangerouslySetInnerHTML={{ __html: conteudo }} />
                    </div>
                </div>

                <aside className={styles.article__sidebar}>
                    <div style={{ padding: '1.5rem', border: '1px solid #eaeaea', borderRadius: '4px' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#0056b3' }}>Newsletter</h3>
                        <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '1rem' }}>Receba as principais notícias do dia no seu e-mail.</p>
                        <input type="email" placeholder="O seu melhor e-mail" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                        <button style={{ width: '100%', padding: '0.75rem', background: '#0056b3', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Cadastrar</button>
                    </div>

                    {ultimasNoticias.length > 0 && (
                        <div className={styles.sidebar__latest}>
                            <h3 className={styles.sidebar__latest__title}>Últimas Notícias</h3>
                            <div className={styles.sidebar__latest__list}>
                                {ultimasNoticias.map((art: any) => {
                                    const artImg = art.imagemDestaque || art.imagemCapa || art.featured_image || art.cover_image || "placeholder.jpg";
                                    const artTitulo = art.titulo || art.title;
                                    return (
                                        <Link key={art.id || art.slug} to={`/noticia/${art.slug}`} state={{ noticia: art }} className={styles.sidebar__latest__card}>
                                            <img src={artImg} alt={artTitulo} className={styles.sidebar__latest__img} />
                                            <h4 className={styles.sidebar__latest__cardTitle}>{artTitulo}</h4>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </aside>

            </article>
        </main>
    );
}

export default Noticia;