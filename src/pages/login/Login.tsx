import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { LoginController, LoginRequestError, LoginValidationError } from "../../controllers/LoginController";
import type LoginCredentials from "../../interfaces/Login";
import logo from "../../assets/imgs/APURA BAHIA - MARCA - HORIZONTAL - SLOGAN - LARANJA.svg";
import styles from "./Login.module.css";

const Login = () => {
    const navegar = useNavigate();
    const [credenciais, setCredenciais] = useState<LoginCredentials>({ email: "", senha: "" });
    const [mensagemErro, setMensagemErro] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const [estaEnviando, setEstaEnviando] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const controladorRef = useRef<AbortController | null>(null);

    useEffect(() => {
        return () => controladorRef.current?.abort();
    }, []);

    const atualizarCampo = (campo: keyof LoginCredentials, valor: string) => {
        setCredenciais((estadoAtual) => ({ ...estadoAtual, [campo]: valor }));
        setMensagemErro("");
        setMensagemSucesso("");
    };

    const enviarFormulario = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMensagemErro("");
        setMensagemSucesso("");
        setEstaEnviando(true);
        controladorRef.current?.abort();
        const controlador = new AbortController();
        controladorRef.current = controlador;

        try {
            await LoginController.autenticar(credenciais, controlador.signal);
            navegar("/dashboard");
        } catch (error: unknown) {
            if (error instanceof DOMException && error.name === "AbortError") {
                return;
            }
            if (error instanceof LoginValidationError && !credenciais.email.trim()) {
                emailRef.current?.focus();
            }
            if (error instanceof LoginRequestError || error instanceof LoginValidationError) {
                setMensagemErro(error.message);
            } else {
                setMensagemErro("Não foi possível concluir o login.");
            }
        } finally {
            if (!controlador.signal.aborted) {
                setEstaEnviando(false);
            }
        }
    };

    return (
        <main className={styles.page}>
            <section className={styles.panel} aria-labelledby="login-title">
                <img className={styles.logo} src={logo} alt="Apura Bahia" />
                <div className={styles.heading}>
                    <span className={styles.eyebrow}>Gerenciamento</span>
                    <h1 id="login-title">Acesse sua conta</h1>
                    <p>Entre para continuar no painel do Apura Bahia.</p>
                </div>
                <form className={styles.form} onSubmit={enviarFormulario} noValidate>
                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <input
                            ref={emailRef}
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={credenciais.email}
                            onChange={(event) => atualizarCampo("email", event.target.value)}
                            aria-invalid={Boolean(mensagemErro)}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="senha">Senha</label>
                        <input
                            id="senha"
                            name="senha"
                            type="password"
                            autoComplete="current-password"
                            value={credenciais.senha}
                            onChange={(event) => atualizarCampo("senha", event.target.value)}
                            aria-invalid={Boolean(mensagemErro)}
                            required
                        />
                    </div>
                    {mensagemErro && <p className={styles.error} role="alert">{mensagemErro}</p>}
                    {mensagemSucesso && <p className={styles.success} role="status">{mensagemSucesso}</p>}
                    <button className={styles.submit} type="submit" disabled={estaEnviando}>
                        {estaEnviando ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </section>
        </main>
    );
};

export default Login;
