import type { AuthenticatedUser, SessionResponse } from "../interfaces/Auth";
import type { UsuarioSelect } from "../interfaces/Usuario";

export class AuthSessionError extends Error {
    public readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "AuthSessionError";
        this.status = status;
    }
}

export class AuthController {
    public static async verificarSessao(signal?: AbortSignal): Promise<AuthenticatedUser> {
        let resposta: Response;

        try {
            resposta = await fetch("https://backend-8088.onrender.com/api/auth/me", {
                credentials: "include",
                signal,
            });
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                throw error;
            }
            throw new AuthSessionError("Não foi possível verificar sua sessão.", 0);
        }

        if (resposta.status === 401 || resposta.status === 403) {
            throw new AuthSessionError("Sua sessão não é válida.", resposta.status);
        }

        if (!resposta.ok) {
            throw new AuthSessionError("Não foi possível verificar sua sessão.", resposta.status);
        }

        const dados: unknown = await resposta.json();
        const respostaSessao = dados as SessionResponse;

        if (respostaSessao.user) {
            respostaSessao.user.autores = respostaSessao.user.autores?.map((u) => {
                return { id: u.id, nome: u.nome } as UsuarioSelect;
            });
        }

        const usuario = respostaSessao.user;

        if (!usuario) {
            throw new AuthSessionError("A sessão não retornou um usuário válido.", resposta.status);
        }
        localStorage.setItem("user", JSON.stringify(usuario));
        return usuario;
    }
}
