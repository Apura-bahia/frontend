import type { Usuario } from "../../interfaces/Usuario";
import styles from "./AutorCard.module.css";

interface AutorCardProps {
    usuario?: Usuario;
    nomeAutor?: string;
}

const getInicial = (nome: string) => {
    const partes = nome.trim().split(/\s+/).filter(Boolean);

    if (partes.length === 0) {
        return "A";
    }

    return partes
        .slice(0, 2)
        .map((parte) => parte.charAt(0).toUpperCase())
        .join("");
};

const AutorCard = ({ usuario, nomeAutor }: AutorCardProps) => {
    const autor = usuario ?? {
        id: 0,
        nome: nomeAutor || "Autor",
        cargo: "Colaborador",
        especialidade: "Especialista em conteúdo",
        artigosPublicados: 0,
        seguidores: 0,
    };

    const cargo = autor.cargo || "Colaborador";
    const especialidade = autor.especialidade || "Especialista em conteúdo";
    const artigos = autor.artigosPublicados ?? 0;
    const seguidores = autor.seguidores ?? 0;

    return (
        <article className={styles.autor__card} aria-label={`Card do autor ${autor.nome}`}>
            <div className={styles.avatar} aria-hidden="true">
                {autor.avatarUrl ? (
                    <img src={autor.avatarUrl} alt="" />
                ) : (
                    <span>{getInicial(autor.nome)}</span>
                )}
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.nome}>{autor.nome}</h3>
                    <span className={styles.tag}>{cargo}</span>
                </div>

                <p className={styles.especialidade}>{especialidade}</p>

                <div className={styles.dados}>
                    <span>{artigos} artigos</span>
                    <span>{seguidores} seguidores</span>
                </div>
            </div>
        </article>
    );
};

export default AutorCard;