
import type Login from "../interfaces/Login";

export type LoginResponse = {
    response?: any;    
}


export class LoginValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "LoginValidationError";
    }
}

export class LoginRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "LoginRequestError";
    }
}

export class LoginController {
    public static validarCredenciais(credenciais: Login): void {
        const email = credenciais.email.trim();

        if (!email || !email.includes("@")) {
            throw new LoginValidationError("Informe um email válido.");
        }

        if (!credenciais.senha.trim()) {
            throw new LoginValidationError("Informe sua senha.");
        }
    }

    public static async autenticar(
        credenciais: Login,
        signal?: AbortSignal,
    ): Promise<LoginResponse> {
        this.validarCredenciais(credenciais);

        let resposta: Response;
        try {
            resposta = await fetch("https://backend-8088.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: credenciais.email.trim(),
                    senha: credenciais.senha,
                }),
                credentials: "include",
                signal,
            });
            if (!resposta.ok) {
                if (resposta.status === 401) {
                    throw new LoginRequestError("Email ou senha inválidos.");
                }
                if (resposta.status === 403) {
                    throw new LoginRequestError("O acesso ao login foi bloqueado pelo servidor.");
                }
                throw new LoginRequestError(`Não foi possível realizar o login (${resposta.status}).`);
            }

            const dados = await resposta.json() as LoginResponse;
            return dados;
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                throw error;
            }
            throw new LoginRequestError("Não foi possível conectar ao servidor.");
        }
    }
}