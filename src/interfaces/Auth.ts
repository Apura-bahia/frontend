import type { UsuarioSelect } from "./Usuario";

export interface AuthenticatedUser {
    id?: number;    
    nome?: string;
    email?: string;
    totalUsuario?: number;
    totalPostagem?: number;
    totalMidia?: number;
    autores?: UsuarioSelect[]

}

export interface SessionResponse {
    user?: AuthenticatedUser;
}