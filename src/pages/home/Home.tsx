import { useLoaderData } from "react-router";
import styles from "./Home.module.css"
import type Article from "../../interfaces/Article";
import WebStory from "../../components/webstories/WebStory";
import Editorial from "../../components/editorial/Editorial";
import Parceria from "../../components/parceria/Parceria";

const Home = () => {
    const postagens = useLoaderData() as Article[] | null | undefined;

    // Proteção em caso de erro na API
    if (!postagens || !Array.isArray(postagens)) {
        return (
            <main>
                <section className={`${styles.home__section} ${styles.page}`}>
                    <Parceria />
                    <div style={{ textAlign: "center", padding: "4rem 1rem", width: "100%" }}>
                        <h2>Ups! Não foi possível carregar as notícias.</h2>
                        <p>Estamos a enfrentar uma instabilidade temporária. Tente recarregar a página.</p>
                    </div>
                </section>
            </main>
        );
    }
    
    // Filtros inteligentes para separar as categorias
    const getArticlesByCategory = (category: string) => 
        postagens.filter(a => 
            a.categoria?.toUpperCase() === category || 
            (a as any).category?.toUpperCase() === category
        ).slice(0, 5); 

    const artigosEsporte = getArticlesByCategory("ESPORTE");
    const artigosEconomia = getArticlesByCategory("ECONOMIA");
    const artigosPolitica = getArticlesByCategory("POLITICA");
    const artigosEntretenimento = getArticlesByCategory("ENTRETENIMENTO");
    const artigosMunicipios = getArticlesByCategory("MUNICIPIOS");
    const artigosGeral = getArticlesByCategory("GERAL");

    return (
        <main>
            
            <section className={`${styles.home__section} ${styles.page}`}>

  
                <Editorial 
                    articles={postagens.slice(-5).reverse()} 
                    corFundo="transparent"
                    temaEscuro={false}
                    linkCategoria="/ultimasNoticias"
                />

                

                <Parceria/>

                <Editorial 
                    articles={artigosEconomia} 
                    tituloSecao="Economia" 
                    corFundo="#0A3622"
                    temaEscuro={true} 
                    linkCategoria="/economia"
                />  
    
                <Editorial 
                    articles={artigosEsporte} 
                    tituloSecao="Esporte" 
                    corFundo="#112A46" 
                    temaEscuro={true} 
                    linkCategoria="/esporte"
                />             

                <Editorial 
                    articles={artigosMunicipios} 
                    tituloSecao="Municípios" 
                    corFundo="#1d3536"
                    temaEscuro={true}
                    linkCategoria="/municipios"
                />

                <Editorial 
                    articles={artigosEntretenimento} 
                    tituloSecao="Entretenimento" 
                    corFundo="#3b1b42" 
                    temaEscuro={true} 
                    linkCategoria="/entretenimento"
                />

                <Editorial 
                    articles={artigosGeral} 
                    tituloSecao="Geral" 
                    corFundo="#222222" 
                    temaEscuro={true}
                    linkCategoria="/geral"
                />       

                {/* ==========================================
                    CATEGORIAS COM TEMA CLARO
                ========================================== */}
                <Editorial 
                    articles={artigosPolitica} 
                    tituloSecao="Política" 
                    corFundo="#ffffff"
                    temaEscuro={false}
                    linkCategoria="/politica"
                />
            
            </section>            

            
        </main>
    );
}

export default Home;