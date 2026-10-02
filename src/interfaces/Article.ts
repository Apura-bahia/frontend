
export default interface Article {
    id?: number;
    titulo?: string;       // Era title
    slug?: string;
    subtitulo?: string;    // Era subtitle
    chapeu?: string;       // Era hat
    conteudo?: string;     // Era content
    categoria?: Categoria;
    dataCriacao?: string;
    dataEdicao?: string;
    dataPublicacao?: string;
    imagemDestaque?: string;
    imagemCapa?: string;   // Era cover_image
    videoUrl?: string;     // Era video_url
    autorId?: number;      // 🚨 ADICIONADO: O Java precisa do ID numérico para salvar
    status?: Status;
    authorName?: string;
}

export interface ArticleRequest {
    titulo?: string;
    subtitulo?: string;
    chapeu?: string;
    conteudo?: string;
    categoria?: Categoria;
    autorId?: number;
    status?: Status;
    foto?: string;
    video?: string;
}

export interface ArticleResponse {
    id?: number;
    titulo?: string;
    subtitulo?: string;
    chapeu?: string;
    conteudo?: string;
    categoria?: Categoria;
    autorId?: number;
    status?: Status;
    foto?: string;
    video?: string;
    dataCriacao?: string;
    dataEdicao?: string;
    dataPublicacao?: string;
    nomeAutor?: string;
}

// Adicione as opções exatas do seu banco de dados
export const CATEGORIAS = ["POLITICA", "ECONOMIA", "ESPORTES", "ENTRETENIMENTO", "GERAL", "MUNICIPIOS"] as const;
export type Categoria = typeof CATEGORIAS[number];

export const STATUS_OPCOES = ["RASCUNHO", "PUBLICADO"] as const;
export type Status = typeof STATUS_OPCOES[number];

