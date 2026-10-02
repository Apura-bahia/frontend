import { useState, type ChangeEvent, type FormEvent } from "react";
import { PostagemController } from "../../controllers/PostagemController";
import styles from "./CadastroPostagem.module.css";
import type { UsuarioSelect } from "../../interfaces/Usuario";
import { CATEGORIAS, STATUS_OPCOES, type ArticleRequest, type Categoria, type Status } from "../../interfaces/Article";



const CadastroPostagem = ({ autores }: { autores: UsuarioSelect[] | undefined }) => {
    const [formulario, setFormulario] = useState<ArticleRequest>({} as ArticleRequest);
    const [mensagemErro, setMensagemErro] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const [estaEnviando, setEstaEnviando] = useState(false);
    const [imagensSelecionadas, setImagensSelecionadas] = useState<File[]>([]);
    const [videoSelecionado, setVideoSelecionado] = useState<File | null>(null);

    const limparUploads = () => {
        setImagensSelecionadas([]);
        setVideoSelecionado(null);
    };

    const atualizarCampo = <K extends keyof ArticleRequest>(campo: K, valor: ArticleRequest[K]) => {
        setFormulario((estadoAtual) => ({
            ...estadoAtual,
            [campo]: valor,
        }));
        setMensagemErro("");
        setMensagemSucesso("");
    };

    const enviarFormulario = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMensagemErro("");
        setMensagemSucesso("");

        const titulo = formulario.titulo?.trim();
        const conteudo = formulario.conteudo?.trim();

        if (!titulo) {
            setMensagemErro("Informe o título da postagem.");
            return;
        }

        if (!conteudo) {
            setMensagemErro("Escreva o conteúdo da postagem.");
            return;
        }

        if (!formulario.categoria) {
            setMensagemErro("Selecione uma categoria para a postagem.");
            return;
        }

        setEstaEnviando(true);

        try {
            let urlCapa = formulario.foto || "";

            if (imagensSelecionadas.length > 0) {
                const formData = new FormData();

                formData.append("file", imagensSelecionadas[0]);

                const respostaUpload = await fetch("https://backend-8088.onrender.com/assets/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!respostaUpload.ok) {
                    throw new Error("Falha ao enviar a imagem para o servidor.");
                }

                const dadosUpload = await respostaUpload.json();

                urlCapa = `http://localhost:8080/assets/${dadosUpload.filename}`;
            }

            // ETAPA 2: Monta o objeto da postagem injetando a URL real do Cloudflare
            const postagem: ArticleRequest = {
                ...formulario,
                foto: urlCapa, // <--- Aqui entra a URL pública do R2!
                autorId: formulario.autorId || (autores && autores.length > 0 ? autores[0].id : undefined),
                categoria: formulario.categoria || "MUNICIPIOS",
                status: formulario.status || "PUBLICADO"

            };

            if (!postagem.autorId) {
                throw new Error("Nenhum autor disponível. Verifique se existem usuários cadastrados.");
            }

            // ETAPA 3: Salva a notícia no banco de dados
            await PostagemController.criarPostagem({ ...postagem, status: postagem.status as Status });

            setMensagemSucesso("Postagem cadastrada com sucesso!");
            setFormulario({} as ArticleRequest);
            limparUploads();

        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Não foi possível cadastrar a postagem.";
            setMensagemErro(mensagem);
        } finally {
            setEstaEnviando(false);
        }
    };

    const alterarCampoTexto = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        const campo = name as keyof ArticleRequest;

        if (campo === "categoria") {
            atualizarCampo(campo, value as Categoria);
            return;
        }

        if (campo === "status") {
            atualizarCampo(campo, value as Status);
            return;
        }

        if (campo === "autorId") {
            atualizarCampo(campo, Number(value));
            return;
        }

        setFormulario((estadoAtual) => ({
            ...estadoAtual,
            [name]: value
        }));

        //atualizarCampo(campo, value as ArticleRequest[keyof ArticleRequest]);
    };

    const alterarArquivos = (event: ChangeEvent<HTMLInputElement>) => {
        const arquivos = event.target.files;
        if (!arquivos?.length) {
            setImagensSelecionadas([]);
            return;
        }

        setImagensSelecionadas(Array.from(arquivos));
    };

    const alterarVideo = (event: ChangeEvent<HTMLInputElement>) => {
        const arquivo = event.target.files?.[0] ?? null;
        setVideoSelecionado(arquivo);
    };

    const limparFormulario = () => {
        setFormulario({} as ArticleRequest);
        limparUploads();
    };

    return (
        <section className={styles.card} aria-labelledby="cadastro-postagem-title">
            <div className={styles.heading}>
                <div>
                    <span className={styles.eyebrow}>Editorial</span>
                    <h2 id="cadastro-postagem-title">Cadastrar nova postagem</h2>
                </div>
                <span className={styles.badge}>Rascunho</span>
            </div>

            <form className={styles.form} onSubmit={enviarFormulario} noValidate>
                <div className={styles.grid}>
                    <label className={styles.field}>
                        <span>Título</span>
                        <input
                            name="titulo"
                            type="text"
                            value={formulario.titulo ?? ""}
                            onChange={alterarCampoTexto}
                            placeholder="Digite o título da matéria"
                            required
                        />
                    </label>

                    <label className={styles.field}>
                        <span>Subtítulo</span>
                        <input
                            name="subtitulo"
                            type="text"
                            value={formulario.subtitulo ?? ""}
                            onChange={alterarCampoTexto}
                            placeholder="Resumo curto"
                        />
                    </label>

                    <label className={styles.field}>
                        <span>Chapéu</span>
                        <input
                            name="chapeu"
                            type="text"
                            value={formulario.chapeu ?? ""}
                            onChange={alterarCampoTexto}
                            placeholder="Ex: Destaque da semana"
                        />
                    </label>

                    <label className={styles.field}>
                        <span>Categoria</span>
                        <select
                            name="categoria"
                            value={formulario.categoria ?? "MUNICIPIOS"}
                            onChange={alterarCampoTexto}
                        >
                            {CATEGORIAS.map((categoria) => (
                                <option key={categoria} value={categoria}>
                                    {categoria}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className={styles.field}>
                        <span>Autor</span>
                        <select
                            name="autorId"
                            value={formulario.autorId}
                            onChange={alterarCampoTexto}
                        >
                            {autores?.map((autor) => {
                                return <option key={autor.id} value={autor.id}>{autor.nome}</option>
                            })}
                        </select>
                    </label>


                    <label className={styles.field}>
                        <span>Status</span>
                        <select
                            name="status"
                            value={formulario.status ?? "RASCUNHO"}
                            onChange={alterarCampoTexto}
                        >
                            {STATUS_OPCOES.map((statusOpcao) => (
                                <option key={statusOpcao} value={statusOpcao}>
                                    {statusOpcao}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className={styles.fieldFull}>
                        <span>Conteúdo</span>
                        <textarea
                            name="conteudo"
                            value={formulario.conteudo ?? ""}
                            onChange={alterarCampoTexto}
                            rows={8}
                            placeholder="Escreva o texto da matéria"
                            required
                        />
                    </label>

                    <label className={styles.field}>
                        <span>Imagens</span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={alterarArquivos}
                        />
                        {imagensSelecionadas.length > 0 && (
                            <small className={styles.helperText}>
                                {imagensSelecionadas.length} imagem(ns) selecionada(s). A primeira será a destaque e a segunda a capa.
                            </small>
                        )}
                    </label>

                    <label className={styles.field}>
                        <span>Vídeo</span>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={alterarVideo}
                        />
                        {videoSelecionado && (
                            <small className={styles.helperText}>
                                {videoSelecionado.name}
                            </small>
                        )}
                    </label>

                </div>

                {mensagemErro && <p className={styles.error} role="alert">{mensagemErro}</p>}
                {mensagemSucesso && <p className={styles.success} role="status">{mensagemSucesso}</p>}

                <div className={styles.actions}>
                    <button type="button" className={styles.secondary} onClick={limparFormulario}>
                        Limpar
                    </button>
                    <button type="submit" className={styles.primary} disabled={estaEnviando}>
                        {estaEnviando ? "Salvando..." : "Salvar postagem"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default CadastroPostagem;