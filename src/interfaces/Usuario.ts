export interface Usuario {
    id: number;
    nome: string;
    cargo?: string;
    especialidade?: string;
    bio?: string;
    artigosPublicados?: number;
    seguidores?: number;
    avatarUrl?: string;
}

export interface UsuarioSelect {
    id: number;
    nome: string;
}