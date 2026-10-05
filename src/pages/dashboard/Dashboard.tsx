import { useLoaderData } from "react-router-dom";
import CadastroPostagem from "../../components/postagem/CadastroPostagem";
import type { AuthenticatedUser } from "../../interfaces/Auth";
import styles from "./Dashboard.module.css";
import { useState } from "react";

interface DashboardLoaderData {
    usuario: AuthenticatedUser;
}

const Dashboard = () => {
    const { usuario } = useLoaderData() as DashboardLoaderData;
    const nomeUsuario =  usuario.nome || usuario.email || "Administrador";
    const [isOpenCadastroPostagem, setIsOpenCadastroPostagem] = useState(false);
    
    return (
        <main className={styles.page}>
            <aside className={styles.sidebar} aria-label="Menu administrativo">
                <div className={styles.brand}>Apura Bahia</div>
                <nav>
                    <ul className={styles.menu}>
                        <li><button type="button" className={styles.active}>Painel da redação</button></li>
                        <li><button type="button">Notícias</button></li>
                        <li><button type="button">Mídias</button></li>
                        <li><button type="button">Gerenciar banners</button></li>
                    </ul>
                </nav>
            </aside>

            <section className={styles.content} aria-labelledby="dashboard-title">
                <header className={styles.header}>
                    <div>
                        <span className={styles.eyebrow}>Área administrativa</span>
                        <h1 id="dashboard-title">Olá, {nomeUsuario}</h1>
                        <p>Acompanhe a operação do portal em um só lugar.</p>
                    </div>
                    <span className={styles.status}>Sessão ativa</span>
                </header>

                <section aria-labelledby="metrics-title">
                    <div className={styles.sectionHeading}>
                        <h2 id="metrics-title">Visão geral</h2>
                        <span>Dados do painel</span>
                    </div>
                    <div className={styles.metrics}>
                        <article className={styles.metric} >
                            <span>Postagens </span>
                            <strong>{usuario.totalPostagem ?? "—"}</strong>
                            <small>Integração pendente</small>
                        </article>

                        <article className={styles.metric} >
                            <span>Midias </span>
                            <strong>{usuario.totalMidia ?? "—"}</strong>
                            <small>Integração pendente</small>
                        </article>

                        <article className={styles.metric} >
                            <span>Usuarios </span>
                            <strong>{usuario.totalUsuario ?? "—"}</strong>
                            <small>Integração pendente</small>
                        </article>
                    </div>
                </section>

                

                <section className={styles.actionsSection} aria-labelledby="actions-title">
                    <div className={styles.sectionHeading}>
                        <h2 id="actions-title">Ações rápidas</h2>
                        <span>Fluxos frequentes</span>
                    </div>
                    <div className={styles.actions}>
                        <button type="button" className={styles.action} title="Disponível em breve" onClick={() => setIsOpenCadastroPostagem(!isOpenCadastroPostagem)}>
                            <span className={styles.actionIcon}>+</span>
                            <span>Criar nova postagem</span>
                        </button>    

                        <button type="button" className={styles.action} title="Disponível em breve">
                            <span className={styles.actionIcon}>+</span>
                            <span>Criar novo usuário</span>
                        </button>    

                        <button type="button" className={styles.action} title="Disponível em breve">
                            <span className={styles.actionIcon}>+</span>
                            <span>Criar novo web story</span>
                        </button>    
                    </div>
                    
                </section>

                {isOpenCadastroPostagem && <CadastroPostagem autores={usuario.autores}/>}
            </section>
        </main>
    );
};

export default Dashboard;
