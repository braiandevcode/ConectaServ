// INTERFAZ PARA EL OBJETO DE USUARIO QUE SE MUEVE EN EL SISTEMA
export interface UserPayload {
    id: number;
    username: string;
    roles: string[];
}