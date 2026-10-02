import type { ArticleRequest, ArticleResponse } from "../interfaces/Article";

export class PostagemController {
    public static async getPostagens(signal?: AbortSignal): Promise<ArticleResponse[]> {
        try {
            const response: Response = await fetch(`https://backend-8088.onrender.com/items/articles`, { signal });
            if (!response.ok) {
                throw new Error(`Erro ao buscar postagens: ${response.status}`);
            }

            const responseData = await response.json();            
            return responseData.data;
        } catch (error: unknown) {
            console.error(error);
            throw error;
        }
    }

    public static async criarPostagem(postagem: ArticleRequest, signal?: AbortSignal): Promise<ArticleResponse> {
        try {
            const response: Response = await fetch(`/items/articles`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postagem),
                signal,
            });

            if (!response.ok) {
                const erro = await response.text();
                throw new Error(erro || `Erro ao cadastrar postagem: ${response.status}`);
            }

            const responseData = await response.json();
            return responseData.data ?? responseData;
        } catch (error: unknown) {
            console.error(error);
            throw error;
        }
    }
}