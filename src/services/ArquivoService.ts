export interface ArquivoBase64 {
    nome: string;
    tipo: string;
    base64: string;
}

export class ArquivoService {
    public static async converterArquivoParaBase64(arquivo: File): Promise<string> {
        return new Promise((resolver, rejeitar) => {
            const leitor = new FileReader();

            leitor.onloadend = () => {
                const resultado = typeof leitor.result === "string" ? leitor.result : "";

                if (!resultado) {
                    rejeitar(new Error("Não foi possível converter o arquivo para base64."));
                    return;
                }

                resolver(resultado);
            };

            leitor.onerror = () => {
                rejeitar(new Error("Erro ao ler o arquivo selecionado."));
            };

            leitor.readAsDataURL(arquivo);
        });
    }

    public static async converterArquivosParaBase64(arquivos: FileList | File[]): Promise<string[]> {
        const listaDeArquivos = Array.from(arquivos);

        if (!listaDeArquivos.length) {
            return [];
        }

        return Promise.all(
            listaDeArquivos.map((arquivo) => this.converterArquivoParaBase64(arquivo)),
        );
    }

    public static async converterArquivosParaObjetoBase64(arquivos: FileList | File[]): Promise<ArquivoBase64[]> {
        const listaDeArquivos = Array.from(arquivos);

        if (!listaDeArquivos.length) {
            return [];
        }

        const arquivosConvertidos = await Promise.all(
            listaDeArquivos.map(async (arquivo) => {
                const base64 = await this.converterArquivoParaBase64(arquivo);

                return {
                    nome: arquivo.name,
                    tipo: arquivo.type,
                    base64,
                };
            }),
        );

        return arquivosConvertidos;
    }

    public static async enviarBase64ParaApi<T>(
        endpoint: string,
        payload: T,
        signal?: AbortSignal,
    ): Promise<Response> {
        const resposta = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            signal,
        });

        if (!resposta.ok) {
            const erro = await resposta.text();
            throw new Error(erro || `Erro ao enviar arquivo: ${resposta.status}`);
        }

        return resposta;
    }
}
